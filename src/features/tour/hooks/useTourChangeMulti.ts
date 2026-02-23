import { toast } from "sonner";
import type { AxiosError } from "axios";
import { tourChangeMulti } from "@/services/tour";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTourChangeMulti = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tourChangeMulti,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tourList"] });
      queryClient.invalidateQueries({ queryKey: ["tourTrashList"] });
      toast.success(data.message);
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(errors?.response?.data?.message);
    },
  });
};
