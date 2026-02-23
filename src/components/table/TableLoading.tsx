import { Loader } from "lucide-react";

export const TableLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader className="text-travel-primary h-8 w-8 animate-spin" />
      <span className="text-travel-secondary/60 text-sm font-medium">
        Đang tải dữ liệu...
      </span>
    </div>
  );
};
