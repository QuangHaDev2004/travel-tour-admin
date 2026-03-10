import { PageTitle } from "@/components/pageTitle/PageTitle";
import { pathAdmin } from "@/config/path";
import { ButtonCreate } from "@/components/button/ActionButtons";
import { AccountAdminTable } from "./AccountAdminTable";
import { useAccountAdminList } from "@/hooks/useAccountAdminList";
import { useDeleteAccountAdmin } from "../hooks/useDeleteAccountAdmin";

export const AccountAdminList = () => {
  // Lấy danh sách tài khoản quản trị
  const { data, isLoading } = useAccountAdminList();
  const accountAdminList = data?.accountAdminList ?? [];

  // Thông tin phân trang
  const pagination = data?.pagination ?? {};

  // Hook xóa tài khoản quản trị
  const { mutate: deleteAccountAdmin, isPending: isDeletingAccountAdmin } =
    useDeleteAccountAdmin();

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Tài khoản quản trị" />
        <ButtonCreate to={`/${pathAdmin}/setting/account-admin/create`} />
      </div>
      
      <AccountAdminTable
        data={accountAdminList}
        isLoading={isLoading}
        tableActions={{
          deleteItem: deleteAccountAdmin,
          isDeletingItem: isDeletingAccountAdmin,
        }}
        pagination={pagination}
      />
    </>
  );
};
