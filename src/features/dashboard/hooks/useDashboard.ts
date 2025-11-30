import { getDashboard } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
};
