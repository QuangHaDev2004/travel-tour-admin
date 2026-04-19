import { getTopTourQuantity } from "@/services/report";
import type { FilterType } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

type TopTourQuantityProps = {
  type: FilterType;
};

/**
 * Hook lấy dữ liệu top 5 tour theo số lượng đã đặt, có thể lọc theo ngày, tuần, tháng hoặc năm.
 */
export const useTopTourQuantity = ({ type }: TopTourQuantityProps) => {
  const now = new Date();

  return useQuery({
    queryKey: ["topTourQuantity", type],
    queryFn: async () =>
      getTopTourQuantity({
        type,
        date: now,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      }),
  });
};
