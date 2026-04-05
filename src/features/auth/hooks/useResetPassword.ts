import { resetPassword } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Hook xử lý đặt lại mật khẩu mới.
 * @author QuangHaDev - 05.04.2026
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data?.message ?? "Thành công.");
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(
        errors?.response?.data?.message ??
          "Đã có lỗi xảy ra, vui lòng thử lại sau.",
      );
    },
  });
};
