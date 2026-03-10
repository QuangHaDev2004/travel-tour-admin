import { roleListService } from "@/services/setting";
import { useQuery } from "@tanstack/react-query";

export const useRoleList = () => {
  return useQuery({
    queryKey: ["roleList"],
    queryFn: roleListService,
  });
};
