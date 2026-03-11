import { BaseTable } from "@/components/table/BaseTable";
import type { PaginationDetail } from "@/types/pagination";
import { Trash2 } from "lucide-react";
import type { MultiActionItem } from "@/components/table/TableChangeMulti";
import { useChangeMultiAccountAdmin } from "../../hooks/useChangeMultiAccountAdmin";
import type { RoleItem } from "@/types/setting";
import { columns } from "./RoleColumns";
import { RoleToolbar } from "./RoleToolbar";

export const RoleTable = ({
  data,
  isLoading,
  pagination,
  tableActions,
}: {
  data: RoleItem[];
  isLoading: boolean;
  pagination: PaginationDetail;
  tableActions: {
    deleteItem: (id: string) => void;
    isDeletingItem: boolean;
  };
}) => {
  // Hook gọi API thay đổi nhiều tài khoản
  const {
    mutate: changeMultiAccountAdmin,
    isPending: isChangingMultiAccountAdmin,
  } = useChangeMultiAccountAdmin();

  // Hàm xử lý khi chọn 1 action
  const handleChangeMulti = (
    action: string,
    ids: string[],
    options: { onSuccess: () => void },
  ) => {
    changeMultiAccountAdmin({ action, ids }, { onSuccess: options.onSuccess });
  };

  // Danh sách hành động
  const roleListActions: MultiActionItem[] = [
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
      meta={{ ...tableActions }}
      toolbar={<RoleToolbar />}
      onMultiAction={handleChangeMulti}
      isMultiPending={isChangingMultiAccountAdmin}
      multiActions={roleListActions}
    />
  );
};
