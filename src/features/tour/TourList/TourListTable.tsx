/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TourItem } from "@/types/tour";
import { TourListToolbar } from "./TourListToolbar";
import { BaseTable } from "@/components/table/BaseTable";
import { columns } from "../components/TourListColumns";
import type { PaginationDetail } from "@/types/pagination";
import { useTourChangeMulti } from "../hooks/useTourChangeMulti";

export const TourListTable = ({
  data,
  mutate,
  isLoading,
  isPending,
  pagination,
}: {
  data: TourItem[];
  mutate: any;
  isLoading: boolean;
  isPending: boolean;
  pagination: PaginationDetail;
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
        isPendingTourDelete: isPending,
        tourDelete: mutate,
      }}
      toolbar={<TourListToolbar />}
      onMultiAction={handleChangeMulti}
    />
  );
};
