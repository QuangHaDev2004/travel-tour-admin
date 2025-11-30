import { getRevenueChart } from "@/services/dashboard";
import { useMutation } from "@tanstack/react-query";

export const useRevenueChart = ({
  setDataMonthCurrent,
  setDataMonthPrevious,
}: {
  setDataMonthCurrent: React.Dispatch<React.SetStateAction<number[]>>;
  setDataMonthPrevious: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  return useMutation({
    mutationFn: getRevenueChart,
    onSuccess: (data) => {
      setDataMonthCurrent(data.dataMonthCurrent);
      setDataMonthPrevious(data.dataMonthPrevious);
    },
  });
};
