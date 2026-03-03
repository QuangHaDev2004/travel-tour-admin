import { tourTrash } from "@/services/tour";
import { useSearchParams } from "react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTourTrashList = () => {
  const [searchParams] = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["tourTrashList", params],
    queryFn: () => tourTrash(params),
    placeholderData: keepPreviousData,
  });
};
