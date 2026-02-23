import { Search } from "@/components/common/Search";
import { TableFilter } from "@/components/table/TableFilter";
import { useSearchParams } from "react-router";

export const TourListToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const arrFilterKey = ["status", "price"];

  const isFiltering = Array.from(searchParams.keys()).some((key) =>
    arrFilterKey.includes(key),
  );

  const handleResetFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="flex items-center gap-2">
      <Search placeholder="Tìm tour..." />

      <TableFilter
        label="Chọn trạng thái"
        filterKey="status"
        options={[
          { label: "Hoạt động", value: "active" },
          { label: "Tạm dừng", value: "inactive" },
        ]}
      />

      <TableFilter
        label="Chọn khoảng giá"
        filterKey="price"
        options={[
          { label: "Dưới 5 triệu", value: "0-4999999" },
          { label: "Từ 5 - 10 triệu", value: "5000000-10000000" },
          { label: "Từ 10 - 20 triệu", value: "10000000-20000000" },
          { label: "Trên 20 triệu", value: "20000000-1000000000" },
        ]}
      />

      {isFiltering && (
        <button
          onClick={handleResetFilter}
          className="text-travel-red flex h-9 cursor-pointer items-center gap-1 rounded-sm px-2 text-sm font-medium underline"
        >
          Xóa
        </button>
      )}
    </div>
  );
};
