import { PageTitle } from "@/components/pageTitle/PageTitle";
import { RoleTable } from "./components/RoleTable";
// import { ButtonCreate } from "@/components/button/ButtonCreate";
import { pathAdmin } from "@/config/path";

export const SettingRoleList = () => {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Nhóm quyền" />
        <ButtonCreate to={`/${pathAdmin}/setting/role/create`} />
      </div>
      <RoleTable />
    </>
  );
};
