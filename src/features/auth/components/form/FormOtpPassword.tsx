import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { otpPasswordSchema, type otpPasswordInputs } from "@/types";
import { TextInput } from "../input/TextInput";
import { ButtonSubmit } from "../button/ButtonSubmit";
import { useNavigate, useSearchParams } from "react-router";
import { useOtpPassword } from "../../hooks/useOtpPassword";
import { pathAdmin } from "@/config/path";

/**
 * Form xác thực mã OTP khi người dùng quên mật khẩu.
 * @author QuangHaDev - 15.10.2025
 * Cập nhật bởi: QuangHaDev - 05.04.2026: Thêm xử lý gửi dữ liệu lên BE và điều hướng sau khi thành công.
 */
export const FormOtpPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";

  const { mutate, isPending } = useOtpPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<otpPasswordInputs>({
    resolver: zodResolver(otpPasswordSchema),
  });

  // Xử lý gửi form quên mật khẩu
  const handleOtpPasswordForm: SubmitHandler<otpPasswordInputs> = (data) => {
    const dataFinal = {
      email,
      otp: data.otp,
    };

    mutate(dataFinal, {
      onSuccess: () => {
        navigate(`/${pathAdmin}/account/reset-password`);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOtpPasswordForm)}
      className="flex flex-col gap-7.5"
    >
      <TextInput
        id="otp"
        label="Mã OTP"
        register={register("otp")}
        error={errors.otp}
      />

      <ButtonSubmit label="Xác thực" isPending={isPending} />
    </form>
  );
};
