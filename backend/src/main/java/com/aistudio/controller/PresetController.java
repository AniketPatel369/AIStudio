package com.aistudio.controller;

import com.aistudio.dto.ApiResponse;
import com.aistudio.entity.Preset;
import com.aistudio.repository.PresetRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/presets")
public class PresetController {

    private final PresetRepository presetRepository;

    public PresetController(PresetRepository presetRepository) {
        this.presetRepository = presetRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllPresets() {
        List<Map<String, Object>> presets = presetRepository.findByEnabledTrue().stream()
                .map(this::toMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(presets));
    }

    @GetMapping("/category/{type}")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getByCategory(
            @PathVariable("type") String type) {
        try {
            Preset.PresetCategory category = Preset.PresetCategory.valueOf(type.toUpperCase());
            List<Map<String, Object>> presets = presetRepository
                    .findByCategoryAndEnabledTrue(category).stream()
                    .map(this::toMap)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(ApiResponse.ok(presets));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("INVALID_CATEGORY", "Invalid preset category: " + type));
        }
    }

    private Map<String, Object> toMap(Preset p) {
        return Map.of(
                "id", p.getId(),
                "category", p.getCategory().name(),
                "name", p.getName(),
                "prompt", p.getPrompt() != null ? p.getPrompt() : "",
                "negativePrompt", p.getNegativePrompt() != null ? p.getNegativePrompt() : "",
                "thumbnail", p.getThumbnail() != null ? p.getThumbnail() : ""
        );
    }
}
