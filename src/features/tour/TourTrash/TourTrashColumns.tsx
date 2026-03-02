/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import type { TourItem } from "@/types/tour";
import { statusList } from "@/constants/status";
import { imageDefault } from "@/constants/common";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { BaseBadge } from "@/components/badge/BaseBadge";
import { ButtonUndo } from "@/components/button/ButtonUndo";
import { ButtonDelete } from "@/components/button/ButtonDelete";

export const columns: ColumnDef<TourItem>[] = [
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
    id: "Tên tour",
    header: () => <div className="font-semibold">Tên tour</div>,
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
    accessorKey: "priceNewAdult",
    id: "Giá",
    header: () => <div className="font-semibold">Giá</div>,
    cell: ({ row }) => {
      const { priceNewAdult, priceNewChildren, priceNewBaby } = row.original;

      return (
        <>
          <div>NL: {priceNewAdult.toLocaleString("vi-VN")}đ</div>
          <div>TE: {priceNewChildren.toLocaleString("vi-VN")}đ</div>
          <div>EB: {priceNewBaby.toLocaleString("vi-VN")}đ</div>
        </>
      );
    },
  },
  {
    accessorKey: "stockAdult",
    id: "Còn lại",
    header: () => <div className="font-semibold">Còn lại</div>,
    cell: ({ row }) => {
      const { stockAdult, stockChildren, stockBaby } = row.original;

      return (
        <div>
          <div>NL: {stockAdult}</div>
          <div>TE: {stockChildren}</div>
          <div>EB: {stockBaby}</div>
        </div>
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
    id: "Xóa bởi",
    header: () => <div className="font-semibold">Xóa bởi</div>,
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
          <ButtonUndo
            isPending={meta?.isPendingTourUndo}
            onUndo={() => meta?.tourUndo(item.id)}
          />
          <ButtonDelete
            id={item.id}
            isPending={meta?.isPendingTourDestroy}
            onDelete={(id) => meta?.tourDestroy(id)}
          />
        </div>
      );
    },
  },
];
