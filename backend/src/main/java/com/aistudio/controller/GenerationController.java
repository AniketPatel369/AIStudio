package com.aistudio.controller;

import com.aistudio.dto.ApiResponse;
import com.aistudio.dto.GenerationDTO;
import com.aistudio.entity.User;
import com.aistudio.service.GenerationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/generations")
public class GenerationController {

    private final GenerationService generationService;

    public GenerationController(GenerationService generationService) {
        this.generationService = generationService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createGeneration(
            @AuthenticationPrincipal User user,
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "provider", defaultValue = "pollinations") String provider,
            @RequestParam(value = "model", required = false) String model,
            @RequestParam(value = "presets", defaultValue = "{}") String presets) {
        try {
            Map<String, Object> result = generationService.createGeneration(
                    user, image, provider, model, presets);
            return ResponseEntity.ok(ApiResponse.ok("Generation queued", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("GENERATION_FAILED", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GenerationDTO>> getGeneration(@PathVariable("id") String uuid) {
        try {
            GenerationDTO gen = generationService.getGeneration(uuid);
            return ResponseEntity.ok(ApiResponse.ok(gen));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<Page<GenerationDTO>>> getHistory(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<GenerationDTO> history = generationService.getHistory(user, page, size);
        return ResponseEntity.ok(ApiResponse.ok(history));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteGeneration(
            @PathVariable("id") String uuid,
            @AuthenticationPrincipal User user) {
        try {
            generationService.deleteGeneration(uuid, user);
            return ResponseEntity.ok(ApiResponse.ok("Generation deleted", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("DELETE_FAILED", e.getMessage()));
        }
    }

    @PostMapping("/regenerate")
    public ResponseEntity<ApiResponse<Map<String, Object>>> regenerate(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> body) {
        try {
            Map<String, Object> result = generationService.regenerate(
                    body.get("generationId"), user);
            return ResponseEntity.ok(ApiResponse.ok("Regeneration queued", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("REGENERATE_FAILED", e.getMessage()));
        }
    }
}
