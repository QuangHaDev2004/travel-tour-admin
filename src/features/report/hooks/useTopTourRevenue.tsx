import { getTopTourRevenue } from "@/services/report";
import type { FilterType } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

type TopTourRevenueProps = {
  type: FilterType;
};

/**
 * Hook lấy dữ liệu top 5 tour theo doanh thu, có thể lọc theo ngày, tuần, tháng hoặc năm.
 */
export const useTopTourRevenue = ({ type }: TopTourRevenueProps) => {
  const now = new Date();

  return useQuery({
    queryKey: ["topTourRevenue", type],
    queryFn: async () =>
      getTopTourRevenue({
        type,
        date: now,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      }),
  });
};
