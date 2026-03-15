/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonCopy } from "@/components/button/ButtonCopy";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { Checkbox } from "@/components/ui/checkbox";
import type { ContactItem } from "@/types/contact";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ContactItem>[] = [
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
    accessorKey: "email",
    id: "Email",
    header: () => <div className="font-semibold">Email</div>,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "createdAt",
    id: "Ngày tạo",
    header: () => <div className="font-semibold">Ngày tạo</div>,
    cell: ({ row }) => <div>{row.original.createdAtFormat}</div>,
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
          <ButtonCopy email={item.email} />
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
