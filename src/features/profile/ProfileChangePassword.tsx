import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import {
  profileChangePasswordSchema,
  type ProfileChangePasswordInputs,
} from "@/types";
import { useProfileChangePassword } from "./hooks/useProfileChangePassword";
import { ButtonBack } from "@/components/button/ActionButtons";
import { BaseInput } from "@/components/form/BaseInput";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";

export const ProfileChangePassword = () => {
  const {
    mutate: mutateProfileChangePassword,
    isPending: isPendingProfileChangePassword,
  } = useProfileChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileChangePasswordInputs>({
    resolver: zodResolver(profileChangePasswordSchema),
  });

  const handleProfileChangePasswordForm: SubmitHandler<
    ProfileChangePasswordInputs
  > = (data) => {
    const dataFinal = {
      password: data.password,
    };

    mutateProfileChangePassword(dataFinal);
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Đổi mật khẩu" />
        <ButtonBack />
      </div>
      <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
        <form
          onSubmit={handleSubmit(handleProfileChangePasswordForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <BaseInput
            id="password"
            label="Mật khẩu"
            register={register("password")}
            error={errors.password}
            isRequired
          />

          <BaseInput
            id="confirmPassword"
            label="Nhập lại mật khẩu mới"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            isRequired
          />

          <ButtonSubmit
            text="Đổi mật khẩu"
            isPending={isPendingProfileChangePassword}
          />
        </form>
      </div>
    </>
  );
};
