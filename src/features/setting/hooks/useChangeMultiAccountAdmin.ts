import { changeMultiAccountAdmin } from "@/services/setting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useChangeMultiAccountAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeMultiAccountAdmin,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["accountAdminList"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(
        errors?.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại",
      );
    },
  });
};
