"use client";

/**
 * authContext.tsx
 * Global authentication state for YP Gurukul app.
 * Provides useAuth() hook to any component.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient, ApiError } from '@/lib/apiClient';

// ── Types ──────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, mobileNumber?: string) => Promise<void>;
  logout: () => void;
}

// ── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Provider ───────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true while reading localStorage

  // On mount: restore session from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('ypg_token');
      const storedUser = localStorage.getItem('ypg_user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Malformed data — clear it
      localStorage.removeItem('ypg_token');
      localStorage.removeItem('ypg_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSession = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem('ypg_token', newToken);
    localStorage.setItem('ypg_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiClient.post<{ token: string; user: AuthUser }>(
      '/auth/login',
      { email, password }
    );
    saveSession(data.token, data.user);
  }, [saveSession]);

  const register = useCallback(
    async (name: string, email: string, password: string, mobileNumber?: string) => {
      const data = await apiClient.post<{ token: string; user: AuthUser }>(
        '/auth/register',
        { name, email, password, mobileNumber }
      );
      saveSession(data.token, data.user);
    },
    [saveSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('ypg_token');
    localStorage.removeItem('ypg_user');
    setToken(null);
    setUser(null);
  }, []);

  const value: AuthContextType = { user, token, isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
