import { PageTitle } from "@/components/pageTitle/PageTitle";
import { TourListFilterBar } from "./components/TourListFilterBar";
import { TourListTable } from "./components/TourListTable";
import { ButtonCreate } from "@/components/button/ButtonCreate";
import { ButtonTrash } from "@/components/button/ButtonTrash";
import { pathAdmin } from "@/config/path";
import { useTourList } from "./hooks/useTourList";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";
import type { TourItem } from "@/types/tour";

export const TourList = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data, isLoading } = useTourList();
  const tourList: TourItem[] = data?.tourList ?? [];
  const pagination = data?.pagination ?? {};

  return (
    <>
      {permissions?.includes("tour-view") ? (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Quản lý tour" />
            <div className="flex flex-wrap items-center gap-2">
              {permissions.includes("tour-trash") && (
                <ButtonTrash to={`/${pathAdmin}/tour/trash`} />
              )}
              {permissions.includes("tour-create") && (
                <ButtonCreate to={`/${pathAdmin}/tour/create`} />
              )}
            </div>
          </div>
          {/* <TourListFilterBar /> */}
          <TourListTable tourList={tourList} pagination={pagination} isLoading={isLoading} />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
