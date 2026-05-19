package com.aistudio.controller;

import com.aistudio.dto.ApiResponse;
import com.aistudio.entity.AiModel;
import com.aistudio.entity.Provider;
import com.aistudio.repository.ModelRepository;
import com.aistudio.repository.ProviderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    private final ProviderRepository providerRepository;
    private final ModelRepository modelRepository;

    public ProviderController(ProviderRepository providerRepository,
                              ModelRepository modelRepository) {
        this.providerRepository = providerRepository;
        this.modelRepository = modelRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllProviders() {
        List<Map<String, Object>> providers = providerRepository.findAll().stream()
                .map(p -> Map.<String, Object>of(
                        "id", p.getId(),
                        "name", p.getName(),
                        "code", p.getCode(),
                        "enabled", p.getEnabled(),
                        "priority", p.getPriority()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(providers));
    }

    @GetMapping("/models")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllModels() {
        List<Map<String, Object>> models = modelRepository.findByEnabledTrue().stream()
                .map(m -> Map.<String, Object>of(
                        "id", m.getId(),
                        "name", m.getName(),
                        "code", m.getCode(),
                        "modelType", m.getModelType().name(),
                        "freeTier", m.getFreeTier(),
                        "maxResolution", m.getMaxResolution() != null ? m.getMaxResolution() : "",
                        "providerName", m.getProvider().getName()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(models));
    }
}
