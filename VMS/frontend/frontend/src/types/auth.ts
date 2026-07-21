export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  username: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
  expiresIn: number;
}

export interface AuthUser {
  username: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
}
