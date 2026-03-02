import { toast } from "sonner";
import type { AxiosError } from "axios";
import { tourDestroy } from "@/services/tour";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTourDestroy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourDestroy,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tourTrashList"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(errors?.response?.data?.message);
    },
  });
};
