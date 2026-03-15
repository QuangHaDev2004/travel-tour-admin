import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const getOrderList = async (params?: Record<string, string>) => {
  const res = await api.get(`/${pathAdmin}/order/list`, { params });
  return res.data;
};

export const getOrderDetail = async (id: string) => {
  const res = await api.get(`/${pathAdmin}/order/edit/${id}`);
  return res.data;
};

export const updateOrder = async (
  id: string,
  dataFinal: {
    paymentMethod?: string | undefined;
    paymentStatus?: string | undefined;
    status?: string | undefined;
  },
) => {
  const res = await api.patch(`/${pathAdmin}/order/edit/${id}`, dataFinal);
  return res.data;
};

export const deleteOrder = async (id: string) => {
  const res = await api.patch(`/${pathAdmin}/order/delete/${id}`);
  return res.data;
};
