import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ConfirmDialog } from "../dialog/ConfirmDialog";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { X } from "lucide-react";

export type MultiActionItem =
  | {
      type: "dropdown";
      key: string;
      icon: React.ReactNode;
      tooltip: string;
      items: {
        key: string;
        label: string;
        icon?: React.ReactNode;
      }[];
    }
  | {
      type: "button";
      key: string;
      icon: React.ReactNode;
      tooltip: string;
      destructive?: boolean;
      confirm?: {
        title: (count: number) => string;
        description: string;
        confirmText: string;
      };
    };

type TableChangeMultiProps = {
  selectedCount: number;
  onClearSelection: () => void;
  onAction: (action: string) => void;
  isPending?: boolean;
  actions: MultiActionItem[];
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
  actions,
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

      {/* Danh sách hành động */}
      <div className="flex items-center gap-2">
        {actions.map((action) => {
          // Danh sách dropdown
          if (action.type === "dropdown") {
            return (
              <DropdownMenu key={action.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <button
                        disabled={isPending}
                        className="border-travel-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border bg-white transition-colors hover:bg-gray-100"
                      >
                        {action.icon}
                      </button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>{action.tooltip}</TooltipContent>
                </Tooltip>

                {/* Các hành động cụ thể */}
                <DropdownMenuContent
                  side="top"
                  align="center"
                  sideOffset={16}
                  className="text-travel-secondary"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  {action.items.map((item) => (
                    <DropdownMenuItem
                      key={item.key}
                      className="cursor-pointer py-1.5 text-[13px] font-medium hover:bg-gray-100"
                      onClick={() => onAction(item.key)}
                    >
                      {item.icon}
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          // Danh sách button
          const button = (
            <button
              disabled={isPending}
              className={`${action.destructive ? "bg-travel-red hover:opacity-90" : "border-travel-gray border bg-white hover:bg-gray-100"} flex h-8 w-8 cursor-pointer items-center justify-center rounded-md`}
            >
              {action.icon}
            </button>
          );

          if (action.confirm) {
            return (
              <AlertDialog key={action.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
                  </TooltipTrigger>

                  <TooltipContent>{action.tooltip}</TooltipContent>
                </Tooltip>

                <ConfirmDialog
                  title={action.confirm.title(selectedCount)}
                  description={action.confirm.description}
                  confirmText={action.confirm.confirmText}
                  destructive={action.destructive}
                  isPending={isPending}
                  onConfirm={() => onAction(action.key)}
                />
              </AlertDialog>
            );
          }

          // Hiển thị mặc định
          return (
            <Tooltip key={action.key}>
              <TooltipTrigger asChild>
                <div onClick={() => onAction(action.key)}>{button}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
