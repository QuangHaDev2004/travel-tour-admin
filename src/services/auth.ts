import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const registerService = async (dataFinal: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const res = await api.post(`/${pathAdmin}/account/register`, dataFinal);
  return res.data;
};

export const loginService = async (dataFinal: {
  email: string;
  password: string;
  rememberPassword: boolean | undefined;
}) => {
  const res = await api.post(`/${pathAdmin}/account/login`, dataFinal);
  return res.data;
};

export const logoutService = async () => {
  const res = await api.get(`/${pathAdmin}/account/logout`);
  return res.data;
};

export const fetchMeService = async () => {
  const res = await api.get(`/${pathAdmin}/account/me`);
  return res.data;
};

export const refreshService = async () => {
  const res = await api.post(`/${pathAdmin}/auth/refresh`);
  return res.data;
};

/**
 * API gửi yêu cầu khôi phục mật khẩu tài khoản Admin qua Email.
 * @param {string} dataFinal.email - Email đăng ký tài khoản.
 * @author QuangHaDev - 05.04.2026
 */
export const forgotPassword = async (dataFinal: { email: string }) => {
  const res = await api.post(
    `/${pathAdmin}/account/forgot-password`,
    dataFinal,
  );
  return res.data;
};

/**
 * API xác thực mã OTP.
 * @author QuangHaDev - 05.04.2026
 */
export const otpPassword = async (dataFinal: {
  email: string;
  otp: string;
}) => {
  const res = await api.post(`/${pathAdmin}/account/otp-password`, dataFinal);
  return res.data;
};

/**
 * API cập nhật mật khẩu mới cho tài khoản.
 * @author QuangHaDev - 05.04.2026
 */
export const resetPassword = async (dataFinal: { password: string }) => {
  const res = await api.post(`/${pathAdmin}/account/reset-password`, dataFinal);
  return res.data;
};
