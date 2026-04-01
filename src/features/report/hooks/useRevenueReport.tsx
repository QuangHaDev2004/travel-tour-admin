import { getRevenueReport } from "@/services/report";
import { useQuery } from "@tanstack/react-query";

type RevenueReportProps = {
  type: "day" | "week" | "month" | "year";
};

export const useRevenueReport = ({ type }: RevenueReportProps) => {
  const now = new Date();

  return useQuery({
    queryKey: ["revenueReport", type],
    queryFn: async () => {
      return await getRevenueReport({
        type,
        date: now,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      });
    },
  });
};
