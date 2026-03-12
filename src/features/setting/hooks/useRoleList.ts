import { roleList } from "@/services/setting";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export const useRoleList = () => {
  const [searchParams] = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["roleList", params],
    queryFn: () => roleList(params),
    placeholderData: keepPreviousData,
  });
};
