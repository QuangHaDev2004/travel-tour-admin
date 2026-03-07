import { deleteCategoryService } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryService,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(errors?.response?.data?.message);
    },
  });
};
