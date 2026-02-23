/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const Pagination = ({
  pagination,
  list,
}: {
  pagination: {
    skip: number;
    totalRecord: number;
    totalPage: number;
  };
  list: any;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const handlePageChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("page", value);
    } else {
      params.delete("page");
    }
    setSearchParams(params);
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-5 px-2">
      <div className="text-travel-secondary/60 text-sm font-medium">
        Hiển thị {pagination.skip + 1} - {pagination.skip + list.length} của{" "}
        {pagination.totalRecord}
      </div>
      <Select value={page} onValueChange={handlePageChange}>
        <SelectTrigger className="border-travel-secondary/20 h-8! rounded-sm w-28 bg-white text-sm font-medium">
          <SelectValue placeholder="Chọn trang" />
        </SelectTrigger>
        <SelectContent
          align="end"
          className="max-h-75"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {Array(pagination.totalPage)
            .fill("")
            .map((_, index) => (
              <SelectItem
                key={index}
                value={(index + 1).toString()}
                className="cursor-pointer"
              >
                Trang {index + 1}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
