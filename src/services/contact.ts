import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const getContactList = async () => {
  const res = await api.get(`/${pathAdmin}/contact/list`);
  return res.data;
};
