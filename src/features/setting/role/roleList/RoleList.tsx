import { PageTitle } from "@/components/pageTitle/PageTitle";
import { pathAdmin } from "@/config/path";
import { ButtonCreate } from "@/components/button/ActionButtons";
import { useRoleList } from "../../hooks/useRoleList";
import type { RoleItem } from "@/types/setting";
import { RoleTable } from "./RoleTable";
import { useDeleteRole } from "../../hooks/useDeleteRole";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";

export const RoleList = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data, isLoading } = useRoleList();
  const roleList: RoleItem[] = data?.roleList ?? [];
  const pagination = data?.pagination ?? {};

  const { mutate: deleteRole, isPending: isDeletingRole } = useDeleteRole();

  return (
    <>
      {permissions?.includes("role-view") ? (
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
      ) : (
        <NoPermission />
      )}
    </>
  );
};
