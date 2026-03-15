import { BaseTable } from "@/components/table/BaseTable";
import type { PaginationDetail } from "@/types/pagination";
import { CircleArrowUp, ClipboardList, Trash2 } from "lucide-react";
import type { MultiActionItem } from "@/components/table/TableChangeMulti";
import { columns } from "./ContactListColumns";
import type { ContactItem } from "@/types/contact";
import { ContactListToolbar } from "./ContactListToolbar";
import { useChangeMultiContact } from "../hooks/useChangeMultiContact";
import { toast } from "sonner";

export const ContactListTable = ({
  data,
  isLoading,
  pagination,
  tableActions,
}: {
  data: ContactItem[];
  isLoading: boolean;
  pagination: PaginationDetail;
  tableActions: {
    deleteItem: (id: string) => void;
    isDeletingItem: boolean;
  };
}) => {
  const { mutate: changeMultiContact, isPending: isChangingMultiContact } =
    useChangeMultiContact();

  const handleChangeMulti = (
    action: string,
    ids: string[],
    options: { onSuccess: () => void },
  ) => {
    if (action === "copy") {
      const emails = data
        .filter((item) => ids.includes(item.id))
        .map((item) => item.email)
        .join("; ");

      navigator.clipboard.writeText(emails);
      toast.success(`Đã copy ${ids.length} email.`);
      options.onSuccess();
      return;
    }

    changeMultiContact({ action, ids }, { onSuccess: options.onSuccess });
  };

  // Danh sách hành động
  const contactListActions: MultiActionItem[] = [
    {
      type: "dropdown",
      key: "status",
      icon: <CircleArrowUp className="text-travel-secondary size-4" />,
      tooltip: "Hành động",
      items: [
        {
          key: "copy",
          label: "Copy hàng loạt",
          icon: <ClipboardList />,
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
      toolbar={<ContactListToolbar />}
      onMultiAction={handleChangeMulti}
      isMultiPending={isChangingMultiContact}
      multiActions={contactListActions}
    />
  );
};
