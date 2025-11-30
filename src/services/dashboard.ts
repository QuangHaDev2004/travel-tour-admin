import { pathAdmin } from "@/config/path";
import { api } from "@/libs/axios";

export const getDashboard = async () => {
  const res = await api.get(`/${pathAdmin}/dashboard`);
  return res.data;
};

export const getRevenueChart = async (dataFinal: {
  currentMonth: number;
  currentYear: number;
  previousMonth: number;
  previousYear: number;
  arrayDay: number[];
}) => {
  const res = await api.post(
    `/${pathAdmin}/dashboard/revenue/chart`,
    dataFinal,
  );
  return res.data;
};
