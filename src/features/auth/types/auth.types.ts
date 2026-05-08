import { UserRole } from "@/lib/constants";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface StudentLoginRequest {
  enrollmentNo: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email?: string;
    role: UserRole;
    centerCode?: string;
    centerName?: string;
  };
  token?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OTPVerifyRequest {
  otp: string;
}

export interface TwoFactorSecret {
  secret: string;
  qrCode: string;
}
