package com.aistudio.controller;

import com.aistudio.dto.ApiResponse;
import com.aistudio.entity.Provider;
import com.aistudio.entity.User;
import com.aistudio.repository.GenerationRepository;
import com.aistudio.repository.ProviderRepository;
import com.aistudio.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final GenerationRepository generationRepository;
    private final ProviderRepository providerRepository;

    public AdminController(UserRepository userRepository,
                           GenerationRepository generationRepository,
                           ProviderRepository providerRepository) {
        this.userRepository = userRepository;
        this.generationRepository = generationRepository;
        this.providerRepository = providerRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getUsers() {
        List<Map<String, Object>> users = userRepository.findAll().stream()
                .map(u -> Map.<String, Object>of(
                        "uuid", u.getUuid(),
                        "name", u.getName(),
                        "email", u.getEmail(),
                        "role", u.getRole().name(),
                        "status", u.getStatus().name(),
                        "createdAt", u.getCreatedAt() != null ? u.getCreatedAt().toString() : "",
                        "totalGenerations", generationRepository.countByUserId(u.getId())
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(users));
    }

    @GetMapping("/generations")
    public ResponseEntity<ApiResponse<?>> getAllGenerations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        var generations = generationRepository.findAll();
        return ResponseEntity.ok(ApiResponse.ok(
                Map.of(
                        "total", generations.size(),
                        "generations", generations.stream().limit(size).collect(Collectors.toList())
                )
        ));
    }

    @PostMapping("/provider/toggle")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleProvider(
            @RequestBody Map<String, String> body) {
        String providerId = body.get("providerId");
        Provider provider = providerRepository.findById(Long.parseLong(providerId))
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        provider.setEnabled(!provider.getEnabled());
        providerRepository.save(provider);

        return ResponseEntity.ok(ApiResponse.ok("Provider toggled", Map.of(
                "providerId", provider.getId(),
                "name", provider.getName(),
                "enabled", provider.getEnabled()
        )));
    }
}
