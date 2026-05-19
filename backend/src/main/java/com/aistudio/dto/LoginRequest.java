package com.aistudio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Token is required")
    private String token;
}
