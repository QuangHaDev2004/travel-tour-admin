/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { accountAdminSchema, type AccountAdminInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import type { RoleItem } from "@/types/setting";
import { ButtonBack } from "@/components/button/ActionButtons";
import { BaseInput } from "@/components/form/BaseInput";
import { BaseSelect } from "@/components/form/BaseSelect";
import { FileUploader } from "@/components/form/FileUploader";
import { useRoleList } from "../../hooks/useRoleList";
import { useAccountAdminCreate } from "../../hooks/useAccountAdminCreate";

export const AccountAdminCreate = () => {
  // State để lưu trữ ảnh đại diện
  const [avatars, setAvatars] = useState<any[]>([]);

  // Lấy danh sách nhóm quyền để hiển thị trong select
  const { data } = useRoleList();
  const roleList: RoleItem[] = data?.roleList ?? [];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountAdminInputs>({
    resolver: zodResolver(accountAdminSchema),
  });

  const {
    mutate: mutateAccountAdminCreate,
    isPending: isPendingAccountAdminCreate,
  } = useAccountAdminCreate({ reset, setAvatars });

  const handleWebsiteInfoForm: SubmitHandler<AccountAdminInputs> = (data) => {
    data.avatar = null;
    if (avatars.length > 0 && avatars[0].file instanceof File) {
      data.avatar = avatars[0].file;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("role", data.role || "");
    formData.append("positionCompany", data.positionCompany);
    formData.append("status", data.status || "");
    formData.append("password", data.password);
    formData.append("avatar", data.avatar);

    mutateAccountAdminCreate(formData);
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Tạo tài khoản quản trị" />
        <ButtonBack />
      </div>
      <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
        <form
          onSubmit={handleSubmit(handleWebsiteInfoForm)}
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

          <BaseSelect
            id="role"
            label="Nhóm quyền"
            register={register("role")}
            error={errors.role}
          >
            <option value="">Chọn nhóm quyền</option>
            {roleList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </BaseSelect>

          <BaseInput
            id="positionCompany"
            label="Chức vụ"
            register={register("positionCompany")}
            error={errors.positionCompany}
            isRequired
          />

          <BaseSelect
            id="status"
            label="Trạng thái"
            register={register("status")}
            error={errors.status}
          >
            <option value="initial">Khởi tạo</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm dừng</option>
          </BaseSelect>

          <BaseInput
            id="password"
            label="Mật khẩu"
            register={register("password")}
            error={errors.password}
            isRequired
          />

          <FileUploader
            id="avatar"
            label="Ảnh đại diện"
            files={avatars}
            setFiles={setAvatars}
          />

          <ButtonSubmit
            text="Tạo mới"
            isPending={isPendingAccountAdminCreate}
          />
        </form>
      </div>
    </>
  );
};
