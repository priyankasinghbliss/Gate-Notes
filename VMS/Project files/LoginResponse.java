package com.yourorg.backend.dto;

public record LoginResponse(
        String token,
        String tokenType,
        String username,
        String role,
        long expiresInMillis
) {
}
