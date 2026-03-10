import { getAccounAdminList } from "@/services/setting";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export const useAccountAdminList = () => {
  // Lấy tham số tìm kiếm từ URL
  const [searchParams] = useSearchParams();

  // Chuyển tham số tìm kiếm thành đối tượng
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["accountAdminList", params],
    queryFn: () => getAccounAdminList(params),
    placeholderData: keepPreviousData,
  });
};
