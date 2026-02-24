import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type ConfirmDialogProps = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
  onConfirm: () => void;
  destructive?: boolean;
};

/**
 * Component ConfirmDialog
 * Dùng để hiển thị hộp thoại xác nhận hành động
 */
export const ConfirmDialog = ({
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  isPending = false,
  onConfirm,
  destructive = false,
}: ConfirmDialogProps) => {
  return (
    <AlertDialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
      {/* Header gồm title và description */}
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>

        {description && (
          <AlertDialogDescription>{description}</AlertDialogDescription>
        )}
      </AlertDialogHeader>

      {/* Footer chứa 2 nút: Cancel và Confirm */}
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isPending}>{cancelText}</AlertDialogCancel>

        <AlertDialogAction
          disabled={isPending}
          onClick={onConfirm}
          className={destructive ? "bg-travel-red hover:bg-red-600" : ""}
        >
          {isPending ? "Đang xử lý..." : confirmText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
