import { pathAdmin } from "@/config/path";
import { api } from "@/libs/axios";

export const createCategory = async (dataFinal: FormData) => {
  const res = await api.post(`/${pathAdmin}/category/create`, dataFinal);
  return res.data;
};

export const getCategoryList = async (
  params?: Record<string, string>,
) => {
  const res = await api.get(`/${pathAdmin}/category/list`, { params });
  return res.data;
};

export const getCategoryDetailService = async (id: string | undefined) => {
  const res = await api.get(`/${pathAdmin}/category/edit/${id}`);
  return res.data;
};

export const editCategoryService = async (
  id: string | undefined,
  dataFinal: FormData,
) => {
  const res = await api.patch(`/${pathAdmin}/category/edit/${id}`, dataFinal);
  return res.data;
};

export const deleteCategoryService = async (id: string) => {
  const res = await api.patch(`/${pathAdmin}/category/delete/${id}`);
  return res.data;
};

export const changeMultiCategoryService = async (dataFinal: {
  action: string;
  ids: string[];
}) => {
  const res = await api.patch(`/${pathAdmin}/category/change-multi`, dataFinal);
  return res.data;
};
