import { getAccounAdminList } from "@/services/setting";
import { useQuery } from "@tanstack/react-query";

export const useAccountAdminList = () => {
  return useQuery({
    queryKey: ["accountAdminList"],
    queryFn: getAccounAdminList,
  });
};
