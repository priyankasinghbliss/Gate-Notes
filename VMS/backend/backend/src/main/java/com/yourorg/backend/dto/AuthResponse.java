package com.yourorg.backend.dto;

public record AuthResponse(
        String accessToken,
        String tokenType,
        String username,
        String role,
        long expiresIn
) {
    public static AuthResponse of(String token, String username, String role, long expiresIn) {
        return new AuthResponse(token, "Bearer", username, role, expiresIn);
    }
}
