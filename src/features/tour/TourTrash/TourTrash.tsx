import { pathAdmin } from "@/config/path";
import type { TourItem } from "@/types/tour";
import { TourTrashTable } from "./TourTrashTable";
import { useTourUndo } from "../hooks/useTourUndo";
import { useTourDestroy } from "../hooks/useTourDestroy";
import { useTourTrashList } from "../hooks/useTourTrash";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { ButtonBack } from "@/components/button/ActionButtons";

export const TourTrash = () => {
  const { data, isLoading } = useTourTrashList();
  const tourTrashList: TourItem[] = data?.tourTrashList ?? [];
  const pagination = data?.pagination ?? {};

  const { mutate: tourUndo, isPending: isPendingTourUndo } = useTourUndo();
  const { mutate: tourDestroy, isPending: isPendingTourDestroy } =
    useTourDestroy();

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Thùng rác tour" />
        <ButtonBack to={`/${pathAdmin}/tour/list`} />
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
  );
};
