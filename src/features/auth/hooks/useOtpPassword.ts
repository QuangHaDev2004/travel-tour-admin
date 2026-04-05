import { otpPassword } from "@/services/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Hook xử lý xác thực mã OTP.
 * @author QuangHaDev - 05.04.2026
 */
export const useOtpPassword = () => {
  const { setAccessToken, fetchMe } = useAuthStore();

  return useMutation({
    mutationFn: otpPassword,
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      await fetchMe();
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
