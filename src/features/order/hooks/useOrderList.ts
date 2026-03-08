import { getOrderList } from "@/services/order";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export const useOrderList = () => {
  const [searchParams] = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["orderList", params],
    queryFn: () => getOrderList(params),
    placeholderData: keepPreviousData,
  });
};
