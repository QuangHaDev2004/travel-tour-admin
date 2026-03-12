import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema, type RoleInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { permissionList } from "@/constants/permissions";
import { useState } from "react";
import { useRoleCreate } from "../../hooks/useRoleCreate";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { ButtonBack } from "@/components/button/ActionButtons";
import { BaseInput } from "@/components/form/BaseInput";
import { CheckboxList } from "@/components/form/CheckboxList";

export const RoleCreate = () => {
  const [permissions, setPermissions] = useState<string[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleInputs>({
    resolver: zodResolver(roleSchema),
  });

  const { mutate: mutateRoleCreate, isPending: isPendingRoleCreate } =
    useRoleCreate({ reset, setPermissions });

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

    mutateRoleCreate(dataFinal);
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Tạo nhóm quyền" />
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

          <ButtonSubmit text="Tạo mới" isPending={isPendingRoleCreate} />
        </form>
      </div>
    </>
  );
};
