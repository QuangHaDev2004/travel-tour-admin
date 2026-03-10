/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseBadge } from "@/components/badge/BaseBadge";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { Checkbox } from "@/components/ui/checkbox";
import { pathAdmin } from "@/config/path";
import { imageDefault } from "@/constants/common";
import { statusList } from "@/constants/status";
import type { AccountAdminItem } from "@/types/account";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AccountAdminItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-travel-primary data-[state=checked]:border-travel-primary border-travel-gray"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="data-[state=checked]:bg-travel-primary data-[state=checked]:border-travel-primary border-travel-gray"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    id: "Họ tên",
    header: () => <div className="font-semibold">Họ tên</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.original.fullName}</div>
    ),
  },
  {
    accessorKey: "avatar",
    id: "Ảnh đại diện",
    header: () => <div className="text-center font-semibold">Ảnh đại diện</div>,
    cell: ({ row }) => {
      const avatarUrl = row.original.avatar;
      const name = row.original.fullName;

      return (
        <img
          src={avatarUrl || imageDefault}
          alt={name}
          className="border-travel-gray mx-auto h-15 w-15 rounded-sm border object-cover"
        />
      );
    },
  },
  {
    accessorKey: "email",
    id: "Email",
    header: () => <div className="font-semibold">Email</div>,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "phone",
    id: "Số điện thoại",
    header: () => <div className="font-semibold">Số điện thoại</div>,
    cell: ({ row }) => <div>{row.original.phone || "Chưa có"}</div>,
  },
  {
    accessorKey: "roleName",
    id: "Nhóm quyền",
    header: () => <div className="font-semibold">Nhóm quyền</div>,
    cell: ({ row }) => <div>{row.original.roleName || "Chưa có"}</div>,
  },
  {
    accessorKey: "positionCompany",
    id: "Chức vụ",
    header: () => <div className="font-semibold">Chức vụ</div>,
    cell: ({ row }) => (
      <div className="w-32 truncate">
        {row.original.positionCompany || "Chưa có"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    id: "Trạng thái",
    header: () => <div className="font-semibold">Trạng thái</div>,
    cell: ({ row }) => {
      const statusValue = row.original.status;
      const status = statusList.find((st) => st.value === statusValue);

      return <BaseBadge status={status} />;
    },
  },
  {
    id: "actions",
    header: () => <div className="font-semibold">Hành động</div>,
    enableHiding: false,
    cell: ({ row, table }) => {
      const item = row.original;
      const meta = table.options.meta as any;

      return (
        <div className="border-travel-gray bg-travel-gray-2 inline-flex items-center rounded-sm border">
          <ButtonEdit
            to={`/${pathAdmin}/setting/account-admin/edit/${item.id}`}
          />
          <ButtonDelete
            id={item.id}
            isPending={meta?.isDeletingItem}
            onDelete={(id) => meta?.deleteItem(id)}
          />
        </div>
      );
    },
  },
];
