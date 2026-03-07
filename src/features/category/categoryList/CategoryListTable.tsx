/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TourItem } from "@/types/tour";
import { columns } from "./CategoryListColumns";
import { BaseTable } from "@/components/table/BaseTable";
import type { PaginationDetail } from "@/types/pagination";
import { CategoryListToolbar } from "./CategoryListToolbar";
import { Circle, CircleArrowUp, CircleOff, Trash2 } from "lucide-react";
import { useCategoryChangeMulti } from "../hooks/useCategoryChangeMulti";
import type { MultiActionItem } from "@/components/table/TableChangeMulti";

export const CategoryListTable = ({
  data,
  isLoading,
  categoryDelete,
  isPendingCategoryDelete,
  pagination,
}: {
  data: TourItem[];
  isLoading: boolean;
  categoryDelete: any;
  isPendingCategoryDelete: boolean;
  pagination: PaginationDetail;
}) => {
  // Hook gọi API thay đổi nhiều tour
  const {
    mutate: categoryChangeMulti,
    isPending: isPendingCategoryChangeMulti,
  } = useCategoryChangeMulti();

  // Hàm xử lý khi chọn 1 action
  const handleChangeMulti = (
    action: string,
    ids: string[],
    options: { onSuccess: () => void },
  ) => {
    categoryChangeMulti({ action, ids }, { onSuccess: options.onSuccess });
  };

  // Danh sách hành động
  const categoryListActions: MultiActionItem[] = [
    {
      type: "dropdown",
      key: "status",
      icon: <CircleArrowUp className="text-travel-secondary size-4" />,
      tooltip: "Cập nhật trạng thái",
      items: [
        {
          key: "active",
          label: "Hoạt động",
          icon: <Circle />,
        },
        {
          key: "inactive",
          label: "Tạm dừng",
          icon: <CircleOff />,
        },
      ],
    },
    {
      type: "button",
      key: "delete",
      icon: <Trash2 className="size-4 text-white" />,
      tooltip: "Xóa các mục đã chọn",
      destructive: true,
      confirm: {
        title: (count) => `Xác nhận xoá ${count} mục?`,
        description: "Hành động này của bạn không thể hoàn tác.",
        confirmText: "Xóa",
      },
    },
  ];

  return (
    <BaseTable
      data={data}
      isLoading={isLoading}
      columns={columns}
      pagination={pagination}
      isMultiPending={isPendingCategoryChangeMulti}
      meta={{
        isPendingTourDelete: isPendingCategoryDelete,
        categoryDelete: categoryDelete,
      }}
      toolbar={<CategoryListToolbar />}
      onMultiAction={handleChangeMulti}
      multiActions={categoryListActions}
    />
  );
};
