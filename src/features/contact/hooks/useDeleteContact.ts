import { deleteContact } from "@/services/contact";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["contactList"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(
        errors?.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại.",
      );
    },
  });
};
