import { useSearchParams } from "react-router";
import { getTourListService } from "@/services/tour";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTourList = () => {
  const [searchParams] = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["tourList", params],
    queryFn: () => getTourListService(params),
    placeholderData: keepPreviousData,
  });
};
