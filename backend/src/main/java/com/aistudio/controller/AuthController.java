package com.aistudio.controller;

import com.aistudio.dto.ApiResponse;
import com.aistudio.dto.LoginRequest;
import com.aistudio.entity.User;
import com.aistudio.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@Valid @RequestBody LoginRequest request) {
        try {
            Map<String, Object> result = authService.login(request.getToken());
            return ResponseEntity.ok(ApiResponse.ok("Login successful", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("AUTH_FAILED", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        return ResponseEntity.ok(ApiResponse.ok("Logged out successfully", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("UNAUTHORIZED", "Not authenticated"));
        }
        return ResponseEntity.ok(ApiResponse.ok(authService.getCurrentUser(user)));
    }
}
