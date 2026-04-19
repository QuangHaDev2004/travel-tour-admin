/* eslint-disable @typescript-eslint/no-explicit-any */
import { pathAdmin } from "@/config/path";
import { api } from "@/lib/axios";

export const getRevenueReport = async (payload: any) => {
  const res = await api.post(`/${pathAdmin}/report/revenue`, payload);
  return res.data;
};

export const getTopTourQuantity = async (payload: any) => {
  const res = await api.post(`/${pathAdmin}/report/top-tour-quantity`, payload);
  return res.data;
};

export const getTopTourRevenue = async (payload: any) => {
  const res = await api.post(`/${pathAdmin}/report/top-tour-revenue`, payload);
  return res.data;
};
