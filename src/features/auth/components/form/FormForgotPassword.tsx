import { forgotPasswordSchema, type ForgotPasswordInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextInput } from "../input/TextInput";
import { ButtonSubmit } from "../button/ButtonSubmit";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { useNavigate } from "react-router";
import { pathAdmin } from "@/config/path";

/**
 * Component Form xử lý yêu cầu khôi phục mật khẩu.
 * @author QuangHaDev - 15.10.2025
 * Cập nhật bởi: QuangHaDev - 05.04.2026: Thêm xử lý gửi dữ liệu lên BE và điều hướng sau khi thành công.
 */
export const FormForgotPassword = () => {
  const navigate = useNavigate();

  // Gọi API quên mật khẩu
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Xử lý gửi form quên mật khẩu
  const handleForgotPasswordForm: SubmitHandler<ForgotPasswordInputs> = (
    data,
  ) => {
    mutate(data, {
      onSuccess: () => {
        navigate(`/${pathAdmin}/account/otp-password?email=${data.email}`);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleForgotPasswordForm)}
      className="flex flex-col gap-7.5"
    >
      <TextInput
        id="email"
        label="Email"
        register={register("email")}
        error={errors.email}
      />

      <ButtonSubmit label="Gửi mã OTP" isPending={isPending} />
    </form>
  );
};
