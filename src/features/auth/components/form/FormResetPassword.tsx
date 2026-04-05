import { resetPasswordSchema, type ResetPasswordInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PasswordInput } from "../input/PasswordInput";
import { ButtonSubmit } from "../button/ButtonSubmit";
import { useNavigate } from "react-router";
import { useResetPassword } from "../../hooks/useResetPassword";
import { pathAdmin } from "@/config/path";

/**
 * Component Form thiết lập lại mật khẩu mới.
 * @author QuangHaDev - 15.10.2025
 * Cập nhật bởi QuangHaDev - 05.04.2026: Thêm xử lý gửi dữ liệu lên BE
 */
export const FormResetPassword = () => {
  const navigate = useNavigate();

  // Hook xử lý gọi API cập nhật mật khẩu
  const { mutate, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  /**
   * Xử lý gửi form đặt lại mật khẩu.
   */
  const handleResetPasswordForm: SubmitHandler<ResetPasswordInputs> = (
    data,
  ) => {
    const dataFinal = {
      password: data.password,
    };

    mutate(dataFinal, {
      onSuccess: () => {
        navigate(`/${pathAdmin}/dashboard`);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleResetPasswordForm)}
      className="flex flex-col gap-7.5"
    >
      <PasswordInput
        id="password"
        label="Mật khẩu"
        register={register("password")}
        error={errors.password}
      />

      <PasswordInput
        id="confirmPassword"
        label="Xác nhận mật khẩu"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />

      <ButtonSubmit label="Thay đổi" isPending={isPending} />
    </form>
  );
};
