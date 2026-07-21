import { axiosClient } from "./axiosClient";
import type { AuthResponse, LoginPayload } from "../types/auth";

export const authApi = {
  login: (payload: LoginPayload) =>
    axiosClient.post<AuthResponse>("/auth/login", payload).then((r) => r.data),
};
