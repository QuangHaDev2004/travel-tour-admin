import { PageTitle } from "@/components/pageTitle/PageTitle";
import { pathAdmin } from "@/config/path";
import { ButtonCreate } from "@/components/button/ActionButtons";
import { useRoleList } from "../../hooks/useRoleList";
import type { RoleItem } from "@/types/setting";
import { RoleTable } from "./RoleTable";
import { useDeleteRole } from "../../hooks/useDeleteRole";

export const RoleList = () => {
  const { data, isLoading } = useRoleList();
  const roleList: RoleItem[] = data?.roleList ?? [];
  const pagination = data?.pagination ?? {};

  const { mutate: deleteRole, isPending: isDeletingRole } = useDeleteRole();

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Nhóm quyền" />
        <ButtonCreate to={`/${pathAdmin}/setting/role/create`} />
      </div>

      <RoleTable
        data={roleList}
        isLoading={isLoading}
        pagination={pagination}
        tableActions={{
          deleteItem: deleteRole,
          isDeletingItem: isDeletingRole,
        }}
      />
    </>
  );
};
