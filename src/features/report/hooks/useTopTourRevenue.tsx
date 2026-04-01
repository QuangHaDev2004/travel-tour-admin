import { getTopTourRevenue } from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export const useTopTourRevenue = () => {
  return useQuery({
    queryKey: ["topTourRevenue"],
    queryFn: getTopTourRevenue,
  });
};
