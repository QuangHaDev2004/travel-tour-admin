/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { Checkbox } from "@/components/ui/checkbox";
import { pathAdmin } from "@/config/path";
import { EMPTY_VALUE_PLACEHOLDER } from "@/constants/common";
import type { RoleItem } from "@/types/setting";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RoleItem>[] = [
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
    id: "Tên nhóm quyền",
    header: () => <div className="font-semibold">Tên nhóm quyền</div>,
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    id: "Mô tả ngắn",
    header: () => <div className="font-semibold">Mô tả ngắn</div>,
    cell: ({ row }) => (
      <div>{row.original.description || EMPTY_VALUE_PLACEHOLDER}</div>
    ),
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
          <ButtonEdit to={`/${pathAdmin}/setting/role/edit/${item.id}`} />
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
