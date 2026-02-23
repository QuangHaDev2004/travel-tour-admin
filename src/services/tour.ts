import { pathAdmin } from "@/config/path";
import { api } from "@/libs/axios";

export const createTourService = async (dataFinal: FormData) => {
  const res = await api.post(`/${pathAdmin}/tour/create`, dataFinal);
  return res.data;
};

export const getTourListService = async (params?: Record<string, string>) => {
  const res = await api.get(`/${pathAdmin}/tour/list`, { params });
  return res.data;
};

export const tourDetailService = async (id: string) => {
  const res = await api.get(`/${pathAdmin}/tour/edit/${id}`);
  return res.data;
};

export const tourEditService = async (id: string, dataFinal: FormData) => {
  const res = await api.patch(`/${pathAdmin}/tour/edit/${id}`, dataFinal);
  return res.data;
};

export const tourDeleteService = async (id: string) => {
  const res = await api.patch(`/${pathAdmin}/tour/delete/${id}`);
  return res.data;
};

export const tourChangeMulti = async (dataFinal: {
  action: string;
  ids: string[];
}) => {
  const res = await api.patch(`/${pathAdmin}/tour/change-multi`, dataFinal);
  return res.data;
};

export const tourTrashListService = async (params?: Record<string, string>) => {
  const res = await api.get(`/${pathAdmin}/tour/trash/list`, { params });
  return res.data;
};

export const tourUndoService = async (id: string) => {
  const res = await api.patch(`/${pathAdmin}/tour/undo/${id}`);
  return res.data;
};

export const tourDestroyService = async (id: string) => {
  const res = await api.delete(`/${pathAdmin}/tour/destroy/${id}`);
  return res.data;
};
