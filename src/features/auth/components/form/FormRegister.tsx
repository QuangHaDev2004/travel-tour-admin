import { registerSchema, type RegisterInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextInput } from "../input/TextInput";
import { PasswordInput } from "../input/PasswordInput";
import { ButtonSubmit } from "../button/ButtonSubmit";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/services/auth";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { pathAdmin } from "@/config/path";

export const FormRegister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerService,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/${pathAdmin}/account/register-initial`);
    },
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(
        errors?.response?.data?.message ||
          "Đã có lỗi xảy ra, vui lòng thử lại.",
      );
    },
  });

  const handleRegisterForm: SubmitHandler<RegisterInputs> = (data) => {
    const dataFinal = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    mutate(dataFinal);
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegisterForm)}
      className="flex flex-col gap-5"
    >
      <TextInput
        id="fullName"
        label="Họ tên"
        register={register("fullName")}
        error={errors.fullName}
      />

      <TextInput
        id="email"
        label="Email"
        register={register("email")}
        error={errors.email}
      />

      <PasswordInput
        id="password"
        label="Mật khẩu"
        register={register("password")}
        error={errors.password}
      />

      <div>
        <label className="flex items-center gap-4">
          <input
            type="checkbox"
            {...register("agree")}
            className="checkbox checkbox-primary border-travel-gray hover:border-travel-primary h-5 w-5 rounded-sm border"
          />
          <span className="text-travel-secondary/60 text-sm font-semibold">
            Tôi chấp nhận các điều khoản và điều kiện
          </span>
        </label>
        {errors.agree && (
          <p className="text-travel-error mt-1 text-xs font-semibold">
            {errors.agree.message}
          </p>
        )}
      </div>

      <ButtonSubmit label="Đăng ký" isPending={isPending} />
    </form>
  );
};
