import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const getContactList = async (params: Record<string, string>) => {
  const res = await api.get(`/${pathAdmin}/contact/list`, { params });
  return res.data;
};

export const deleteContact = async (id: string) => {
  const res = await api.patch(`/${pathAdmin}/contact/delete/${id}`);
  return res.data;
};

export const changeMultiContact = async (dataFinal: {
  action: string;
  ids: string[];
}) => {
  const res = await api.patch(`/${pathAdmin}/contact/change-multi`, dataFinal);
  return res.data;
};
