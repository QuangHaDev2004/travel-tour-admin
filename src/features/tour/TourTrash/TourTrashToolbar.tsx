import { Search } from "@/components/common/Search";

export const TourTrashToolbar = () => {
  return (
    <div className="flex items-center gap-2">
      <Search placeholder="Tìm tour..." />
    </div>
  );
};
