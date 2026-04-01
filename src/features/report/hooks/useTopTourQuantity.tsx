import { getTopTourQuantity } from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export const useTopTourQuantity = () => {
  return useQuery({
    queryKey: ["topTourQuantity"],
    queryFn: getTopTourQuantity,
  });
};
