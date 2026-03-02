/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TourItem } from "@/types/tour";
import { columns } from "./TourTrashColumns";
import { TourTrashToolbar } from "./TourTrashToolbar";
import { BaseTable } from "@/components/table/BaseTable";
import type { PaginationDetail } from "@/types/pagination";
import { useTourChangeMulti } from "../hooks/useTourChangeMulti";

export const TourTrashTable = ({
  data,
  isLoading,
  pagination,
  tourDestroy,
  isPendingTourDestroy,
  tourUndo,
  isPendingTourUndo,
}: {
  data: TourItem[];
  isLoading: boolean;
  pagination: PaginationDetail;
  tourDestroy: any;
  isPendingTourDestroy: boolean;
  tourUndo: any;
  isPendingTourUndo: boolean;
}) => {
  // Hook gọi API thay đổi nhiều tour
  const { mutate: tourChangeMulti, isPending: isPendingTourChangeMulti } =
    useTourChangeMulti();

  // Hàm xử lý khi chọn 1 action
  const handleChangeMulti = (
    action: string,
    ids: string[],
    options: { onSuccess: () => void },
  ) => {
    tourChangeMulti({ action, ids }, { onSuccess: options.onSuccess });
  };

  return (
    <BaseTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      isMultiPending={isPendingTourChangeMulti}
      pagination={pagination}
      meta={{
        isPendingTourDestroy: isPendingTourDestroy,
        tourDestroy: tourDestroy,
        tourUndo: tourUndo,
        isPendingTourUndo: isPendingTourUndo,
      }}
      toolbar={<TourTrashToolbar />}
      onMultiAction={handleChangeMulti}
    />
  );
};
