/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TourItem } from "@/types/tour";
import { columns } from "./TourTrashColumns";
import { RotateCcw, Trash2 } from "lucide-react";
import { TourTrashToolbar } from "./TourTrashToolbar";
import { BaseTable } from "@/components/table/BaseTable";
import type { PaginationDetail } from "@/types/pagination";
import { useTourChangeMulti } from "../hooks/useTourChangeMulti";
import type { MultiActionItem } from "@/components/table/TableChangeMulti";

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

  // Danh sách hành động
  const tourTrashActions: MultiActionItem[] = [
    {
      type: "button",
      key: "undo",
      icon: <RotateCcw className="size-4" />,
      tooltip: "Khôi phục",
    },
    {
      type: "button",
      key: "destroy",
      icon: <Trash2 className="size-4 text-white" />,
      tooltip: "Xóa vĩnh viễn",
      destructive: true,
      confirm: {
        title: (count) => `Xác nhận xoá vĩnh viễn ${count} mục?`,
        description: "Hành động này không thể hoàn tác.",
        confirmText: "Xóa vĩnh viễn",
      },
    },
  ];

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
      multiActions={tourTrashActions}
    />
  );
};
