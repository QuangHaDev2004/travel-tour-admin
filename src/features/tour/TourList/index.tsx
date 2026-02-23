import { PageTitle } from "@/components/pageTitle/PageTitle";
import { pathAdmin } from "@/config/path";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";
import type { TourItem } from "@/types/tour";
import { useTourList } from "../hooks/useTourList";
import { useTourDelete } from "../hooks/useTourDelete";
import { TourListTable } from "./TourListTable";
import { ButtonCreate, ButtonTrash } from "@/components/button/ActionButtons";

export const TourList = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data, isLoading } = useTourList();
  const tourList: TourItem[] = data?.tourList ?? [];
  const pagination = data?.pagination ?? {};

  const { mutate, isPending } = useTourDelete();

  return (
    <>
      {permissions?.includes("tour-view") ? (
        <>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
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

          <TourListTable
            data={tourList}
            pagination={pagination}
            isLoading={isLoading}
            mutate={mutate}
            isPending={isPending}
          />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
