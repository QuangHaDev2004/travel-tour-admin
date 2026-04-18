import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema, type RoleInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { permissionList } from "@/constants/permissions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRoleDetail } from "../../hooks/useRoleDetail";
import { useRoleEdit } from "../../hooks/useRoleEdit";
import { ButtonBack } from "@/components/button/ActionButtons";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { BaseInput } from "@/components/form/BaseInput";
import { CheckboxList } from "@/components/form/CheckboxList";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";

export const RoleEdit = () => {
  const { account } = useAuthStore();
  const permissionsAcc = account?.permissions;

  const { id } = useParams();
  const [permissions, setPermissions] = useState<string[]>([]);
  const { roleDetail } = useRoleDetail({ id: id! });
  const { mutate: mutateRoleEdit, isPending: isPendingRoleEdit } = useRoleEdit({
    id: id!,
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleInputs>({
    resolver: zodResolver(roleSchema),
  });

  useEffect(() => {
    if (roleDetail) {
      reset({
        ...roleDetail,
      });
    }

    if (roleDetail.permissions && roleDetail.permissions.length > 0) {
      setPermissions(roleDetail.permissions);
    }
  }, [reset, roleDetail]);

  const handlePermission = (value: string) => {
    setPermissions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleRoleForm: SubmitHandler<RoleInputs> = (data) => {
    const dataFinal = {
      ...data,
      permissions,
    };

    mutateRoleEdit(dataFinal);
  };

  return (
    <>
      {permissionsAcc?.includes("role-edit") ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Chỉnh sửa nhóm quyền" />
            <ButtonBack />
          </div>
          <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
            <form
              onSubmit={handleSubmit(handleRoleForm)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <BaseInput
                id="name"
                label="Tên nhóm quyền"
                register={register("name")}
                error={errors.name}
                isRequired
              />

              <BaseInput
                id="description"
                label="Mô tả ngắn"
                register={register("description")}
                error={errors.description}
              />

              <CheckboxList
                label="Phân quyền"
                list={permissionList}
                valueKey="value"
                labelKey="label"
                selectedValues={permissions}
                onToggle={handlePermission}
              />

              <ButtonSubmit text="Cập nhật" isPending={isPendingRoleEdit} />
            </form>
          </div>
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
