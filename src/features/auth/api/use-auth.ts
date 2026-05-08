"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";
import type {
  LoginRequest,
  StudentLoginRequest,
  LoginResponse,
  ChangePasswordRequest,
  TwoFactorSecret,
} from "../types/auth.types";

// ─── Login ───
export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await apiClient.post<LoginResponse>("/loginRoute", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Login successful", {
        description: `Welcome back, ${data.user.name}!`,
      });
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error("Login failed", { description: error.message });
    },
  });
}

// ─── Student Login ───
export function useStudentLogin() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (data: StudentLoginRequest) => {
      const res = await apiClient.post<LoginResponse>("/studentLogin", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Login successful");
      router.push("/student-portal");
    },
    onError: (error: Error) => {
      toast.error("Login failed", { description: error.message });
    },
  });
}

// ─── Logout ───
export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: async () => {
      await apiClient.get("/logout");
    },
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: () => {
      // Force logout even on error
      logout();
      router.push("/login");
    },
  });
}

// ─── Change Password ───
export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const res = await apiClient.post("/ChangePassword", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to change password", { description: error.message });
    },
  });
}

// ─── OTP Verification ───
export function useOTPVerify() {
  return useMutation({
    mutationFn: async (data: { otp: string }) => {
      const res = await apiClient.post("/otpInput", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("OTP verified successfully");
    },
    onError: (error: Error) => {
      toast.error("OTP verification failed", { description: error.message });
    },
  });
}

// ─── 2FA ───
export function useGenerate2FASecret() {
  return useQuery<TwoFactorSecret>({
    queryKey: ["2fa-secret"],
    queryFn: async () => {
      const res = await apiClient.get("/generateSecret");
      return res.data;
    },
    enabled: false, // Manual trigger
  });
}

export function useEnable2FA() {
  return useMutation({
    mutationFn: async (data: { otp: string }) => {
      const res = await apiClient.post("/otpVerify", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Two-factor authentication enabled");
    },
    onError: (error: Error) => {
      toast.error("Failed to enable 2FA", { description: error.message });
    },
  });
}

export function useDisable2FA() {
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/disable2fa");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Two-factor authentication disabled");
    },
    onError: (error: Error) => {
      toast.error("Failed to disable 2FA", { description: error.message });
    },
  });
}
