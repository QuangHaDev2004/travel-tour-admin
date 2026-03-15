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
