import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const templateDetailService = async () => {
  const res = await api.get(`/${pathAdmin}/template`);
  return res.data;
};

export const templateEditService = async (dataFinal: {
  dataTourListOne?: string | undefined;
  dataTourListTwo?: string | undefined;
}) => {
  const res = await api.patch(`/${pathAdmin}/template`, dataFinal);
  return res.data;
};
