import type { TourItem } from "@/types/tour";
import { TourTrashTable } from "./TourTrashTable";
import { useTourUndo } from "../hooks/useTourUndo";
import { useTourDestroy } from "../hooks/useTourDestroy";
import { useTourTrashList } from "../hooks/useTourTrash";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { ButtonBack } from "@/components/button/ActionButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";

export const TourTrash = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data, isLoading } = useTourTrashList();
  const tourTrashList: TourItem[] = data?.tourTrashList ?? [];
  const pagination = data?.pagination ?? {};

  const { mutate: tourUndo, isPending: isPendingTourUndo } = useTourUndo();
  const { mutate: tourDestroy, isPending: isPendingTourDestroy } =
    useTourDestroy();

  return (
    <>
      {permissions?.includes("tour-trash") ? (
        <>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Thùng rác tour" />
            <ButtonBack />
          </div>

          <TourTrashTable
            data={tourTrashList}
            isLoading={isLoading}
            pagination={pagination}
            tourDestroy={tourDestroy}
            isPendingTourDestroy={isPendingTourDestroy}
            tourUndo={tourUndo}
            isPendingTourUndo={isPendingTourUndo}
          />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
