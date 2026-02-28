/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { TableEmpty } from "@/components/table/TableEmpty";
import type { PaginationDetail } from "@/types/pagination";
import { TableLoading } from "@/components/table/TableLoading";
import { TableChangeMulti } from "@/components/table/TableChangeMulti";
import { BasePagination } from "@/components/pagination/BasePagination";

type BaseTableProps<TData extends { id: string }> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  isLoading: boolean;
  isMultiPending: boolean;
  pagination: PaginationDetail;
  meta: any;
  toolbar: React.ReactNode;
  onMultiAction: (
    action: string,
    ids: string[],
    options: { onSuccess: () => void },
  ) => void;
};

export function BaseTable<TData extends { id: string }>({
  data,
  columns,
  pagination,
  isLoading,
  isMultiPending,
  meta,
  toolbar,
  onMultiAction,
}: BaseTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    meta,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Lấy danh sách id của các dòng đang được chọn
  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <div className="flex items-center">
        {toolbar}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="hover:border-travel-primary ml-auto hover:bg-white hover:shadow-md"
            >
              <SlidersHorizontal />
              Hiển thị cột
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuGroup>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="font-medium"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-hidden rounded-sm border bg-white">
        <Table className="text-travel-secondary">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-60 text-center"
                >
                  <TableLoading />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-4 text-center"
                >
                  <TableEmpty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Phân trang */}
      {data.length > 0 && (
        <BasePagination list={data} pagination={pagination} />
      )}

      {/* Thanh thao tác nhiều */}
      {selectedIds.length > 0 && (
        <TableChangeMulti
          selectedCount={selectedIds.length}
          onClearSelection={() => setRowSelection({})}
          onAction={(action) =>
            onMultiAction(action, selectedIds, {
              onSuccess: () => setRowSelection({}),
            })
          }
          isPending={isMultiPending}
        />
      )}
    </div>
  );
}
