/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";
import type { TourItem } from "@/types/tour";
import { TableEmpty } from "@/components/table/TableEmpty";
import type { PaginationDetail } from "@/types/pagination";
import { columns } from "../components/TourTableColumns";
import { TourListToolbar } from "./TourListToolbar";
import { BasePagination } from "@/components/pagination/BasePagination";
import { TableChangeMulti } from "@/components/table/TableChangeMulti";
import { useState } from "react";
import { TableLoading } from "@/components/table/TableLoading";
import { useTourChangeMulti } from "../hooks/useTourChangeMulti";

export const TourListTable = ({
  data,
  pagination,
  isLoading,
  mutate,
  isPending,
}: {
  data: TourItem[];
  pagination: PaginationDetail;
  isLoading: boolean;
  mutate: any;
  isPending: boolean;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      isPendingTourDelete: isPending,
      tourDelete: mutate,
    },
  });

  // Lấy danh sách id của các tour đang được chọn
  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  // Hook gọi API thay đổi nhiều tour
  const { mutate: tourChangeMulti, isPending: isPendingTourChangeMulti } =
    useTourChangeMulti();

  // Hàm xử lý khi chọn 1 action
  const handleChangeMulti = (action: string) => {
    tourChangeMulti(
      { action, ids: selectedIds },
      { onSuccess: () => setRowSelection({}) },
    );
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <div className="flex items-center">
        <TourListToolbar />
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
          onAction={handleChangeMulti}
          isPending={isPendingTourChangeMulti}
        />
      )}
    </div>
  );
};
