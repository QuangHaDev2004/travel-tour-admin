/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseBadge } from "@/components/badge/BaseBadge";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { Checkbox } from "@/components/ui/checkbox";
import { pathAdmin } from "@/config/path";
import { imageDefault } from "@/constants/common";
import { statusList } from "@/constants/status";
import type { CategoryItem } from "@/types/category";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns: ColumnDef<CategoryItem>[] = [
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
    accessorKey: "name",
    id: "Tên danh mục",
    header: () => <div className="font-semibold">Tên danh mục</div>,
    cell: ({ row }) => (
      <div className="w-36 truncate capitalize">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "avatar",
    id: "Ảnh đại diện",
    header: () => <div className="text-center font-semibold">Ảnh đại diện</div>,
    cell: ({ row }) => {
      const avatarUrl = row.original.avatar;
      const name = row.original.name;

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
    accessorKey: "position",
    id: "Vị trí",
    header: () => <div className="text-center font-semibold">Vị trí</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.position}</div>
    ),
  },
  {
    accessorKey: "status",
    id: "Trạng thái",
    header: () => <div className="text-center font-semibold">Trạng thái</div>,
    cell: ({ row }) => {
      const statusValue = row.original.status;
      const status = statusList.find((st) => st.value === statusValue);

      return (
        <div className="text-center">
          <BaseBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    id: "Tạo bởi",
    header: () => <div className="font-semibold">Tạo bởi</div>,
    cell: ({ row }) => {
      const { createdByFullName, createdAt } = row.original;

      return (
        <>
          <div>{createdByFullName}</div>
          <div>{dayjs(createdAt).format("HH:mm - DD/MM/YYYY")}</div>
        </>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    id: "Cập nhật bởi",
    header: () => <div className="font-semibold">Cập nhật bởi</div>,
    cell: ({ row }) => {
      const { updatedByFullName, updatedAt } = row.original;

      return (
        <>
          <div>{updatedByFullName}</div>
          <div>{dayjs(updatedAt).format("HH:mm - DD/MM/YYYY")}</div>
        </>
      );
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
          <ButtonEdit to={`/${pathAdmin}/category/edit/${item.id}`} />
          <ButtonDelete
            id={item.id}
            isPending={meta?.isPendingCategoryDelete}
            onDelete={(id) => meta?.categoryDelete(id)}
          />
        </div>
      );
    },
  },
];
