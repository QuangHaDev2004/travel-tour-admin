import { pathAdmin } from "@/config/path";
import { TourTrashTable } from "./TourTrashTable";
import { useTourUndo } from "../hooks/useTourUndo";
import { useTourDestroy } from "../hooks/useTourDestroy";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { useTourTrashList } from "../hooks/useTourTrashList";
import { ButtonBack } from "@/components/button/ActionButtons";
// import { TourTrashTable } from "../components/TourTrashTable";

export const TourTrash = () => {
  const { pagination, tourTrashList } = useTourTrashList();
  const { mutate: tourUndo, isPending: isPendingTourUndo } = useTourUndo();
  const { mutate: tourDestroy, isPending: isPendingTourDestroy } =
    useTourDestroy();

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Thùng rác tour" />
        <ButtonBack to={`/${pathAdmin}/tour/list`} />
      </div>

      {/* <TourTrashTable /> */}

      <TourTrashTable
        data={tourTrashList}
        // isLoading={isLoading}
        pagination={pagination}
        tourDestroy={tourDestroy}
        isPendingTourDestroy={isPendingTourDestroy}
        tourUndo={tourUndo}
        isPendingTourUndo={isPendingTourUndo}
      />
    </>
  );
};
