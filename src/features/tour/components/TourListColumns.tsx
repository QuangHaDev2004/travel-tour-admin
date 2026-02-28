/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseBadge } from "@/components/badge/BaseBadge";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { Checkbox } from "@/components/ui/checkbox";
import { pathAdmin } from "@/config/path";
import { imageDefault } from "@/constants/common";
import { statusList } from "@/constants/status";
import { useAuthStore } from "@/stores/useAuthStore";
import type { TourItem } from "@/types/tour";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

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
      const { account } = useAuthStore.getState();
      const permissions = account?.permissions;

      const meta = table.options.meta as any;

      return (
        <div className="border-travel-gray inline-flex items-center rounded-sm border bg-[#f1f4f9]">
          {permissions?.includes("tour-edit") && (
            <ButtonEdit to={`/${pathAdmin}/tour/edit/${item.id}`} />
          )}
          {permissions?.includes("tour-delete") && (
            <ButtonDelete
              id={item.id}
              isPending={meta?.isPendingTourDelete}
              onDelete={(id) => meta?.tourDelete(id)}
            />
          )}
        </div>
      );
    },
  },
];
