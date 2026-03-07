import { toast } from "sonner";
import type { AxiosError } from "axios";
import { changeMultiCategory } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCategoryChangeMulti = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeMultiCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(errors?.response?.data?.message);
    },
  });
};
