import { useSearchParams } from "react-router";
import { getCategoryList } from "@/services/category";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCategoryList = () => {
  const [searchParams] = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["categoryList", params],
    queryFn: () => getCategoryList(params),
    placeholderData: keepPreviousData,
  });
};
