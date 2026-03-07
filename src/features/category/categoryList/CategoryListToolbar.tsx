import { useSearchParams } from "react-router";
import { Search } from "@/components/common/Search";
import type { AccountAdminItem } from "@/types/account";
import { useCategoryList } from "@/hooks/useCategoryList";
import { TableFilter } from "@/components/table/TableFilter";

export const CategoryListToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const arrFilterKey = ["status", "createdBy"];

  const { data } = useCategoryList();
  const accountAdminList = data?.accountAdminList ?? [];

  const isFiltering = Array.from(searchParams.keys()).some((key) =>
    arrFilterKey.includes(key),
  );

  // Hàm xử lý bỏ lọc
  const handleResetFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  // Options cho filter theo người tạo
  const createdByOptions = accountAdminList.map((item: AccountAdminItem) => ({
    label: item.fullName,
    value: item.id,
  }));

  return (
    <div className="flex items-center gap-2">
      <Search placeholder="Tìm tên danh mục..." />

      <TableFilter
        label="Trạng thái"
        filterKey="status"
        options={[
          { label: "Hoạt động", value: "active" },
          { label: "Tạm dừng", value: "inactive" },
        ]}
      />

      <TableFilter
        label="Người tạo"
        filterKey="createdBy"
        options={createdByOptions}
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
