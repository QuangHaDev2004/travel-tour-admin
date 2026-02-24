import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ConfirmDialog } from "../dialog/ConfirmDialog";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Circle, CircleArrowUp, CircleOff, Trash2, X } from "lucide-react";

type TableChangeMultiProps = {
  selectedCount: number;
  onClearSelection: () => void;
  onAction: (action: string) => void;
  isPending: boolean;
};

/**
 * TableChangeMulti
 * Component hiển thị action bar cố định phía dưới màn hình khi user chọn nhiều item trong table.
 *
 * Chức năng:
 * - Hiển thị số lượng item đã chọn
 * - Cho phép cập nhật trạng thái
 * - Cho phép xoá nhiều item
 * - Cho phép clear selection
 */
export const TableChangeMulti = ({
  selectedCount,
  onClearSelection,
  onAction,
  isPending,
}: TableChangeMultiProps) => {
  return (
    <div className="border-travel-gray fixed bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 rounded-xl border bg-white p-2.5 shadow-md">
      {/* Nút Bỏ chọn tất cả */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClearSelection}
            disabled={isPending}
            className="border-travel-gray flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border transition-colors hover:bg-gray-100"
          >
            <X size={14} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bỏ chọn tất cả</p>
        </TooltipContent>
      </Tooltip>

      {/* Hiển thị số lượng đã chọn */}
      <div className="flex items-center gap-1.5">
        <span className="bg-travel-primary rounded-2xl px-4 py-0.5 text-center text-xs text-white">
          {selectedCount}
        </span>
        <span className="text-travel-secondary text-[13px] font-medium">
          mục đã chọn
        </span>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  disabled={isPending}
                  className="border-travel-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border bg-white transition-colors hover:bg-gray-100"
                >
                  <CircleArrowUp className="text-travel-secondary size-4" />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cập nhật trạng thái</p>
            </TooltipContent>
          </Tooltip>

          {/* Set trạng thái Active */}
          <DropdownMenuContent
            side="top"
            align="center"
            sideOffset={16}
            className="text-travel-secondary"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuItem
              className="cursor-pointer py-1.5 text-[13px] font-medium hover:bg-gray-100"
              onClick={() => onAction("active")}
            >
              <Circle />
              Hoạt động
            </DropdownMenuItem>

            {/* Set trạng thái Inactive */}
            <DropdownMenuItem
              className="cursor-pointer py-1.5 text-[13px] font-medium hover:bg-gray-100"
              onClick={() => onAction("inactive")}
            >
              <CircleOff />
              Tạm dừng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Xóa nhiều item  */}
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <button
                  disabled={isPending}
                  className="bg-travel-red flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-opacity hover:opacity-90"
                >
                  <Trash2 className="size-4 text-white" />
                </button>
              </AlertDialogTrigger>
            </TooltipTrigger>

            <TooltipContent>
              <p>Xóa các mục đã chọn</p>
            </TooltipContent>
          </Tooltip>

          <ConfirmDialog
            title={`Xác nhận xoá ${selectedCount} mục?`}
            description="Hành động này của bạn không thể hoàn tác."
            confirmText="Xóa"
            destructive
            isPending={isPending}
            onConfirm={() => onAction("delete")}
          />
        </AlertDialog>
      </div>
    </div>
  );
};
