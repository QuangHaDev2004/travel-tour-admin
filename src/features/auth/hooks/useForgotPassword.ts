import { forgotPassword } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Hook xử lý yêu cầu quên mật khẩu.
 * @author QuangHaDev - 05.04.2026
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
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
