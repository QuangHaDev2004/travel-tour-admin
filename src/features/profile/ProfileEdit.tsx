/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { profileEditSchema, type ProfileEditInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { pathAdmin } from "@/config/path";
import { useProfileDetail } from "./hooks/useProfileDetail";
import { useProfileEdit } from "./hooks/useProfileEdit";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { BaseInput } from "@/components/form/BaseInput";
import { FileUploader } from "@/components/form/FileUploader";
import { ButtonNext } from "@/components/button/ActionButtons";

export const ProfileEdit = () => {
  const [avatars, setAvatars] = useState<any[]>([]);
  const { profileDetail } = useProfileDetail();
  const { mutate: mutateProfileEdit, isPending: isPendingProfileEdit } =
    useProfileEdit();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditInputs>({
    resolver: zodResolver(profileEditSchema),
  });

  useEffect(() => {
    if (!profileDetail) return;

    if (profileDetail) {
      reset({
        ...profileDetail,
      });
    }

    if (profileDetail && profileDetail.avatar) {
      setAvatars([{ source: profileDetail.avatar }]);
    }
  }, [profileDetail, reset]);

  const handleProfileEditForm: SubmitHandler<ProfileEditInputs> = (data) => {
    data.avatar = null;
    if (avatars.length > 0 && avatars[0].file instanceof File) {
      data.avatar = avatars[0].file;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar);

    mutateProfileEdit(formData);
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Thông tin cá nhân" />
        <ButtonNext
          label="Đổi mật khẩu"
          to={`/${pathAdmin}/profile/change-password`}
        />
      </div>
      <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
        <form
          onSubmit={handleSubmit(handleProfileEditForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <BaseInput
            id="fullName"
            label="Họ tên"
            register={register("fullName")}
            error={errors.fullName}
            isRequired
          />

          <BaseInput
            id="email"
            label="Email"
            register={register("email")}
            error={errors.email}
            isRequired
          />

          <BaseInput
            id="phone"
            label="Số điện thoại"
            register={register("phone")}
            error={errors.phone}
            isRequired
          />

          <BaseInput
            id="positionCompany"
            label="Chức vụ"
            defaultValue={profileDetail?.positionCompany}
            readOnly
          />

          <BaseInput
            id="role"
            label="Nhóm quyền"
            defaultValue={profileDetail?.fullName}
            readOnly
          />

          <FileUploader
            id="avatar"
            label="Ảnh đại diện"
            files={avatars}
            setFiles={setAvatars}
          />

          <ButtonSubmit text="Cập nhật" isPending={isPendingProfileEdit} />
        </form>
      </div>
    </>
  );
};
