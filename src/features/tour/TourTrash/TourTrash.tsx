import { PageTitle } from "@/components/pageTitle/PageTitle";
import { pathAdmin } from "@/config/path";
import { Pagination } from "@/components/pagination/Pagination";
import { useTourTrashList } from "../hooks/useTourTrashList";
import { TourTrashTable } from "../components/TourTrashTable";
import { ButtonBack } from "@/components/button/ActionButtons";

export const TourTrash = () => {
  const { pagination, tourTrashList } = useTourTrashList();

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Thùng rác tour" />
        <ButtonBack to={`/${pathAdmin}/tour/list`} />
      </div>
      
      <TourTrashTable />
      
      <Pagination pagination={pagination} list={tourTrashList} />
    </>
  );
};
