import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeMultiContact } from "@/services/contact";

export const useChangeMultiContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeMultiContact,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["contactList"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(
        errors?.response?.data?.message ||
          "Đã có lỗi xảy ra, vui lòng thử lại.",
      );
    },
  });
};
