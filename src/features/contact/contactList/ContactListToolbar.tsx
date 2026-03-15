import { Search } from "@/components/common/Search";

export const ContactListToolbar = () => {
  return (
    <div className="flex items-center gap-2">
      <Search placeholder="Tìm email..." />
    </div>
  );
};
