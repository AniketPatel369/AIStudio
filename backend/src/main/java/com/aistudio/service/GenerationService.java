package com.aistudio.service;

import com.aistudio.dto.GenerationDTO;
import com.aistudio.entity.*;
import com.aistudio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GenerationService {

    private static final Logger logger = LoggerFactory.getLogger(GenerationService.class);

    private final GenerationRepository generationRepository;
    private final ProviderRepository providerRepository;
    private final ModelRepository modelRepository;
    private final LimitService limitService;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${aistudio.storage.base-path}")
    private String storagePath;

    @Value("${aistudio.storage.uploads}")
    private String uploadsDir;

    public GenerationService(GenerationRepository generationRepository,
                             ProviderRepository providerRepository,
                             ModelRepository modelRepository,
                             LimitService limitService,
                             RedisTemplate<String, String> redisTemplate) {
        this.generationRepository = generationRepository;
        this.providerRepository = providerRepository;
        this.modelRepository = modelRepository;
        this.limitService = limitService;
        this.redisTemplate = redisTemplate;
    }

    /**
     * Creates a new generation request and queues it for processing.
     */
    @Transactional
    public Map<String, Object> createGeneration(User user,
                                                 MultipartFile image,
                                                 String providerCode,
                                                 String modelCode,
                                                 String presetConfig) throws IOException {

        // 1. Validate limits
        if (!limitService.canGenerate(user)) {
            throw new RuntimeException("Daily generation limit exceeded");
        }

        // 2. Store input image
        String inputImagePath = storeImage(image, user.getUuid());

        // 3. Resolve provider & model
        Provider provider = providerRepository.findByCode(providerCode)
                .orElseGet(() -> providerRepository.findByEnabledTrueOrderByPriorityAsc()
                        .stream().findFirst()
                        .orElseThrow(() -> new RuntimeException("No providers available")));

        AiModel model = null;
        if (modelCode != null) {
            model = modelRepository.findByCode(modelCode).orElse(null);
        }

        // 4. Create generation entity
        Generation generation = Generation.builder()
                .user(user)
                .provider(provider)
                .model(model)
                .status(Generation.GenerationStatus.PENDING)
                .inputImage(inputImagePath)
                .prompt(presetConfig)
                .build();
        generation = generationRepository.save(generation);

        // 5. Queue for processing via Redis
        String queuePayload = generation.getUuid();
        redisTemplate.opsForList().rightPush("aistudio:generation:queue", queuePayload);
        logger.info("Generation {} queued for processing", generation.getUuid());

        // 6. Increment daily count
        limitService.incrementCount(user);

        return Map.of(
                "generation_id", generation.getUuid(),
                "status", generation.getStatus().name()
        );
    }

    /**
     * Gets a generation by UUID (for polling).
     */
    public GenerationDTO getGeneration(String uuid) {
        Generation gen = generationRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Generation not found"));
        return toDTO(gen);
    }

    /**
     * Gets paginated generation history for a user.
     */
    public Page<GenerationDTO> getHistory(User user, int page, int size) {
        return generationRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId(), PageRequest.of(page, size))
                .map(this::toDTO);
    }

    /**
     * Deletes a generation.
     */
    @Transactional
    public void deleteGeneration(String uuid, User user) {
        Generation gen = generationRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Generation not found"));
        if (!gen.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        generationRepository.delete(gen);
    }

    /**
     * Re-queues a generation for regeneration.
     */
    @Transactional
    public Map<String, Object> regenerate(String generationId, User user) {
        Generation original = generationRepository.findByUuid(generationId)
                .orElseThrow(() -> new RuntimeException("Generation not found"));

        if (!original.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (!limitService.canGenerate(user)) {
            throw new RuntimeException("Daily generation limit exceeded");
        }

        Generation newGen = Generation.builder()
                .user(user)
                .provider(original.getProvider())
                .model(original.getModel())
                .status(Generation.GenerationStatus.PENDING)
                .inputImage(original.getInputImage())
                .prompt(original.getPrompt())
                .build();
        newGen = generationRepository.save(newGen);

        redisTemplate.opsForList().rightPush("aistudio:generation:queue", newGen.getUuid());
        limitService.incrementCount(user);

        return Map.of(
                "generation_id", newGen.getUuid(),
                "status", newGen.getStatus().name()
        );
    }

    /**
     * Stores an uploaded image to local filesystem.
     */
    private String storeImage(MultipartFile file, String userUuid) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path dir = Paths.get(storagePath, uploadsDir, userUuid);
        Files.createDirectories(dir);
        Path filePath = dir.resolve(filename);
        file.transferTo(filePath.toFile());
        return filePath.toString();
    }

    /**
     * Maps Generation entity to DTO.
     */
    private GenerationDTO toDTO(Generation gen) {
        List<GenerationDTO.VariantDTO> variants = gen.getVariants().stream()
                .map(v -> GenerationDTO.VariantDTO.builder()
                        .imageUrl(v.getImageUrl())
                        .upscaleUrl(v.getUpscaleUrl())
                        .width(v.getWidth())
                        .height(v.getHeight())
                        .build())
                .collect(Collectors.toList());

        return GenerationDTO.builder()
                .uuid(gen.getUuid())
                .status(gen.getStatus().name())
                .prompt(gen.getPrompt())
                .enhancedPrompt(gen.getEnhancedPrompt())
                .outputImage(gen.getOutputImage())
                .inputImage(gen.getInputImage())
                .generationTime(gen.getGenerationTime())
                .failedReason(gen.getFailedReason())
                .createdAt(gen.getCreatedAt() != null ? gen.getCreatedAt().toString() : null)
                .providerName(gen.getProvider() != null ? gen.getProvider().getName() : null)
                .modelName(gen.getModel() != null ? gen.getModel().getName() : null)
                .variants(variants)
                .build();
    }
}
