import { createContext, useContext, useState, type ReactNode } from "react";
import { authApi } from "../api/authApi";
import type { AuthUser, LoginPayload } from "../types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });

  async function login(payload: LoginPayload) {
    const res = await authApi.login(payload);
    const authUser: AuthUser = { username: res.username, role: res.role };
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("authUser", JSON.stringify(authUser));
    setUser(authUser);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
