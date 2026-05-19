package com.aistudio.controller;

import com.aistudio.dto.ApiResponse;
import com.aistudio.dto.UserDTO;
import com.aistudio.entity.User;
import com.aistudio.repository.UserRepository;
import com.aistudio.service.LimitService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final LimitService limitService;

    public UserController(UserRepository userRepository, LimitService limitService) {
        this.userRepository = userRepository;
        this.limitService = limitService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserDTO>> getProfile(@AuthenticationPrincipal User user) {
        UserDTO dto = UserDTO.builder()
                .uuid(user.getUuid())
                .name(user.getName())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .build();
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> updates) {
        if (updates.containsKey("name")) {
            user.setName(updates.get("name"));
        }
        User saved = userRepository.save(user);

        UserDTO dto = UserDTO.builder()
                .uuid(saved.getUuid())
                .name(saved.getName())
                .email(saved.getEmail())
                .avatar(saved.getAvatar())
                .role(saved.getRole().name())
                .status(saved.getStatus().name())
                .build();
        return ResponseEntity.ok(ApiResponse.ok("Profile updated", dto));
    }

    @GetMapping("/limits")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getLimits(
            @AuthenticationPrincipal User user) {
        Map<String, Object> limits = limitService.getLimitStatus(user);
        return ResponseEntity.ok(ApiResponse.ok(limits));
    }
}
