import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const profileDetailService = async () => {
  const res = await api.get(`/${pathAdmin}/profile/edit`);
  return res.data;
};

export const profileEditService = async (dataFinal: FormData) => {
  const res = await api.patch(`/${pathAdmin}/profile/edit`, dataFinal);
  return res.data;
};

export const profileChangePasswordService = async (dataFinal: {
  password: string;
}) => {
  const res = await api.patch(
    `/${pathAdmin}/profile/change-password`,
    dataFinal,
  );
  return res.data;
};
