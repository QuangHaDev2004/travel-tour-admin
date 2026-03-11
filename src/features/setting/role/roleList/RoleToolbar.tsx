import { Search } from "@/components/common/Search";

export const RoleToolbar = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Search placeholder="Tìm tên nhóm quyền..." />
    </div>
  );
};
