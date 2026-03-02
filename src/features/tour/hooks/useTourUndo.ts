import { toast } from "sonner";
import type { AxiosError } from "axios";
import { tourUndoService } from "@/services/tour";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTourUndo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourUndoService,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tourTrashList"] });
      queryClient.invalidateQueries({ queryKey: ["tourList"] });
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(errors?.response?.data?.message);
    },
  });
};
