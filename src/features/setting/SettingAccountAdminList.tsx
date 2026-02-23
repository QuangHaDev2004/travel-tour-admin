import { PageTitle } from "@/components/pageTitle/PageTitle";
import { Pagination } from "@/components/pagination/Pagination";
import { AccountAdminFilterBar } from "./components/AccountAdminFilterBar";
import { AccountAdminTable } from "./components/AccountAdminTable";
// import { ButtonCreate } from "@/components/button/ButtonCreate";
import { pathAdmin } from "@/config/path";

export const SettingAccountAdminList = () => {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Tài khoản quản trị" />
        <ButtonCreate to={`/${pathAdmin}/setting/account-admin/create`} />
      </div>
      <AccountAdminFilterBar />
      <AccountAdminTable />
      {/* <Pagination /> */}
    </>
  );
};
