import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const getCityListService = async () => {
  const res = await api.get(`/${pathAdmin}/city/list`);
  return res.data;
};
