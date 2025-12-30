import { pathAdmin } from "@/config/path";
import { api } from "@/libs/axios";

export const getAccounAdminList = async () => {
  const res = await api.get(`/${pathAdmin}/setting/account-admin/list`);
  return res.data;
};

export const accountAdminCreateService = async (dataFinal: FormData) => {
  const res = await api.post(
    `/${pathAdmin}/setting/account-admin/create`,
    dataFinal,
  );
  return res.data;
};

export const accountAdminDetailService = async (id: string) => {
  const res = await api.get(`/${pathAdmin}/setting/account-admin/edit/${id}`);
  return res.data;
};

export const accountAdminEditService = async (
  id: string,
  dataFinal: FormData,
) => {
  const res = await api.patch(
    `/${pathAdmin}/setting/account-admin/edit/${id}`,
    dataFinal,
  );
  return res.data;
};

export const websiteInfoEditService = async (dataFinal: FormData) => {
  const res = await api.patch(`/${pathAdmin}/setting/website-info`, dataFinal);
  return res.data;
};

export const websiteInfoDetailService = async () => {
  const res = await api.get(`/${pathAdmin}/setting/website-info`);
  return res.data;
};

export const roleCreateService = async (dataFinal: {
  name: string;
  description?: string | undefined;
  permissions?: string[] | undefined;
}) => {
  const res = await api.post(`/${pathAdmin}/setting/role/create`, dataFinal);
  return res.data;
};

export const roleListService = async () => {
  const res = await api.get(`/${pathAdmin}/setting/role/list`);
  return res.data;
};

export const roleDetailService = async (id: string) => {
  const res = await api.get(`/${pathAdmin}/setting/role/edit/${id}`);
  return res.data;
};

export const roleEditService = async (
  id: string,
  dataFinal: {
    name: string;
    description?: string | undefined;
    permissions?: string[] | undefined;
  },
) => {
  const res = await api.patch(
    `/${pathAdmin}/setting/role/edit/${id}`,
    dataFinal,
  );
  return res.data;
};
