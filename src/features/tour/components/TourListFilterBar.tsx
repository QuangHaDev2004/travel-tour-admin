/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCategoryList } from "@/hooks/useCategoryList";
import { useAccountAdminList } from "@/hooks/useAccountAdminList";
import type { AdminAccount } from "@/types/account";
import { renderOptions } from "@/utils/renderOptions";
import { FaRotateLeft } from "react-icons/fa6";
import { useSearchParams } from "react-router";

export const TourListFilterBar = () => {
  const { data: adminAccountList } = useAccountAdminList();
  const allAdminAccounts: AdminAccount[] =
    adminAccountList?.fullAccountAdminList ?? [];
  const { data } = useCategoryList();
  const categoryTree = data?.categoryTree ?? [];
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const createdBy = searchParams.get("createdBy") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const price = searchParams.get("price") || "";
  const category = searchParams.get("category") || "";

  const handleCategoryFilter = (key: string, event: any) => {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <select
          value={status}
          onChange={(event) => handleCategoryFilter("status", event)}
          className="select border-travel-secondary/20 text-travel-secondary h-10 w-[140px] rounded-4xl border bg-white px-4 text-sm font-medium"
        >
          <option value="">Trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Tạm dừng</option>
        </select>

        <select
          value={createdBy}
          onChange={(event) => handleCategoryFilter("createdBy", event)}
          className="select border-travel-secondary/20 text-travel-secondary h-10 w-[160px] rounded-4xl border bg-white px-4 text-sm font-medium"
        >
          <option value="">Người tạo</option>
          {allAdminAccounts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.fullName}
            </option>
          ))}
        </select>

        <div className="border-travel-secondary/20 text-travel-secondary flex h-10 items-center gap-4 rounded-4xl border bg-white px-4 text-sm font-medium">
          <input
            type="date"
            className="w-32"
            value={startDate}
            onChange={(event) => handleCategoryFilter("startDate", event)}
          />
          <span>-</span>
          <input
            type="date"
            className="w-32"
            value={endDate}
            onChange={(event) => handleCategoryFilter("endDate", event)}
          />
        </div>

        <select
          value={category}
          onChange={(event) => handleCategoryFilter("category", event)}
          className="select border-travel-secondary/20 text-travel-secondary h-10 w-[140px] rounded-4xl border bg-white px-4 text-sm font-medium"
        >
          <option value="">Danh mục</option>
          {renderOptions(categoryTree)}
        </select>

        <select
          value={price}
          onChange={(event) => handleCategoryFilter("price", event)}
          className="select border-travel-secondary/20 text-travel-secondary h-10 w-[210px] rounded-4xl border bg-white px-4 text-sm font-medium"
        >
          <option value="">Mức giá</option>
          <option value="0-4999999">Dưới 5 triệu</option>
          <option value="5000000-10000000">Từ 5 triệu đến 10 triệu</option>
          <option value="10000000-20000000">Từ 10 triệu đến 20 triệu</option>
          <option value="20000000-1000000000">Trên 20 triệu</option>
        </select>

        <button
          onClick={handleReset}
          className="text-travel-red border-travel-red flex h-10 cursor-pointer items-center gap-3 rounded-4xl border bg-white px-4 text-sm font-medium"
        >
          <FaRotateLeft className="size-4" />
          Xóa bộ lọc
        </button>
      </div>
    </>
  );
};
