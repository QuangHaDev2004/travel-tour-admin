/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCategory } from "@/services/category";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

type TCreateCategory = {
  reset: UseFormReset<{
    name: string;
    avatar: any;
    parent?: string | undefined;
    position?: number | undefined;
    status?: string | undefined;
    description?: string | undefined;
  }>;
};

export const useCreateCategory = ({ reset }: TCreateCategory) => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      reset();
      toast.success(data.message);
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(errors?.response?.data?.message);
    },
  });
};
