/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { accountAdminSchema, type AccountAdminInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { FormInput } from "@/components/form/FormInput";
import { FormFileUpload } from "@/components/form/FormFileUpload";
import { ButtonSubmit } from "@/components/button/ButtonSubmit";
import { ContextLink } from "@/components/common/ContextLink";
import { pathAdmin } from "@/config/path";
import { useRoleList } from "../hooks/useRoleList";
import { useAccountAdminCreate } from "../hooks/useAccountAdminCreate";

export const AccountAdminCreate = () => {
  const [avatars, setAvatars] = useState<any[]>([]);

  // Lấy danh sách nhóm quyền để hiển thị trong select
  const { data } = useRoleList();
  const roleList = data?.roleList ?? [];

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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Tạo tài khoản quản trị" />
        <ContextLink
          text="Quay lại danh sách"
          to={`/${pathAdmin}/setting/account-admin/list`}
        />
      </div>
      <div className="border-travel-secondary/20 overflow-hidden rounded-md border bg-white p-6 shadow-md">
        <form
          onSubmit={handleSubmit(handleWebsiteInfoForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <FormInput
            id="fullName"
            label="Họ tên"
            register={register("fullName")}
            error={errors.fullName}
            isRequired
          />

          <FormInput
            id="email"
            label="Email"
            register={register("email")}
            error={errors.email}
            isRequired
          />

          <FormInput
            id="phone"
            label="Số điện thoại"
            register={register("phone")}
            error={errors.phone}
            isRequired
          />

          <div>
            <label
              htmlFor="status"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Nhóm quyền
            </label>
            <select
              {...register("role")}
              className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
            >
              <option value="">Chọn nhóm quyền</option>
              {roleList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            id="positionCompany"
            label="Chức vụ"
            register={register("positionCompany")}
            error={errors.positionCompany}
            isRequired
          />

          <div>
            <label
              htmlFor="status"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Trạng thái
            </label>
            <select
              {...register("status")}
              className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
            >
              <option value="initial">Khởi tạo</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm dừng</option>
            </select>
          </div>

          <FormInput
            id="password"
            label="Mật khẩu"
            register={register("password")}
            error={errors.password}
            isRequired
          />

          <FormFileUpload
            name="avatar"
            label="Ảnh đại diện"
            files={avatars}
            setFiles={setAvatars}
          />

          <ButtonSubmit isPending={isPendingAccountAdminCreate} />
        </form>
      </div>
    </>
  );
};
