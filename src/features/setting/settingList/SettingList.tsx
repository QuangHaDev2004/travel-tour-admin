import { Link } from "react-router";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { SETTING_LIST } from "../constants/settingList";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";

export const SettingList = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  return (
    <>
      {permissions?.includes("setting-view") ? (
        <>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Cài đặt chung" />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7.5 xl:grid-cols-3">
            {SETTING_LIST.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="flex items-center justify-center gap-5 rounded-sm bg-white p-6.25 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex h-17.5 w-17.5 items-center justify-center rounded-full bg-[#E7EDFF]">
                  <item.icon className="text-travel-primary text-[30px]" />
                </div>
                <div className="text-travel-secondary text-lg font-semibold">
                  {item.content}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
