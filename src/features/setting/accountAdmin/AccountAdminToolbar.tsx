import { useSearchParams } from "react-router";
import { Search } from "@/components/common/Search";
import { TableFilter } from "@/components/table/TableFilter";
import { useRoleList } from "../hooks/useRoleList";
import type { RoleItem } from "@/types/setting";

export const AccountAdminToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const arrFilterKey = ["status", "role"];

  // Lấy danh sách nhóm quyền để hiển thị filter
  const { data } = useRoleList();
  const roleList = data?.roleList ?? [];

  const isFiltering = Array.from(searchParams.keys()).some((key) =>
    arrFilterKey.includes(key),
  );

  // Hàm xử lý bỏ lọc
  const handleResetFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  // Options cho filter theo nhóm quyền
  const roleOptions = roleList.map((item: RoleItem) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Search placeholder="Tìm email..." />

      <TableFilter
        label="Trạng thái"
        filterKey="status"
        options={[
          { label: "Khởi tạo", value: "initial" },
          { label: "Hoạt động", value: "active" },
          { label: "Tạm dừng", value: "inactive" },
        ]}
      />

      <TableFilter label="Nhóm quyền" filterKey="role" options={roleOptions} />

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
