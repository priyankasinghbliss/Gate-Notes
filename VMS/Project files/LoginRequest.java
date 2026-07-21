package com.yourorg.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(

        @Schema(example = "admin")
        @NotBlank(message = "Username is required")
        String username,

        @Schema(example = "admin123")
        @NotBlank(message = "Password is required")
        String password
) {
}
