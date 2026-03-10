import { BaseTable } from "@/components/table/BaseTable";
import type { PaginationDetail } from "@/types/pagination";
import {
  Circle,
  CircleArrowUp,
  CircleDashed,
  CircleOff,
  Trash2,
} from "lucide-react";
import type { MultiActionItem } from "@/components/table/TableChangeMulti";
import type { AccountAdminItem } from "@/types/account";
import { columns } from "./AccountAdminColumns";
import { useChangeMultiAccountAdmin } from "../../hooks/useChangeMultiAccountAdmin";
import { AccountAdminToolbar } from "./AccountAdminToolbar";

export const AccountAdminTable = ({
  data,
  isLoading,
  pagination,
  tableActions,
}: {
  data: AccountAdminItem[];
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
  const accountAdminListActions: MultiActionItem[] = [
    {
      type: "dropdown",
      key: "status",
      icon: <CircleArrowUp className="text-travel-secondary size-4" />,
      tooltip: "Cập nhật trạng thái",
      items: [
        {
          key: "initial",
          label: "Khởi tạo",
          icon: <CircleDashed />,
        },
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
      meta={{ ...tableActions }}
      toolbar={<AccountAdminToolbar />}
      onMultiAction={handleChangeMulti}
      isMultiPending={isChangingMultiAccountAdmin}
      multiActions={accountAdminListActions}
    />
  );
};
