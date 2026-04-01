/* eslint-disable @typescript-eslint/no-explicit-any */
import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const getRevenueReport = async (payload: any) => {
  const res = await api.post(`/${pathAdmin}/report/revenue`, payload);
  return res.data;
};

export const getTopTourQuantity = async () => {
  const res = await api.get(`/${pathAdmin}/report/top-tour-quantity`);
  return res.data;
};

export const getTopTourRevenue = async () => {
  const res = await api.get(`/${pathAdmin}/report/top-tour-revenue`);
  return res.data;
};
