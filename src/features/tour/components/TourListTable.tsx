/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { EmptyTableRow } from "@/components/table/EmptyTableRow";
import { pathAdmin } from "@/config/path";
import { Search } from "@/components/common/Search";
import dayjs from "dayjs";
import { useState } from "react";
import { useTourChangeMulti } from "../hooks/useTourChangeMulti";
import { useTourDelete } from "../hooks/useTourDelete";
import { useAuthStore } from "@/stores/useAuthStore";
import { imageDefault } from "@/constants/common";
import { statusList } from "@/constants/status";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { TourItem } from "@/types/tour";
import { SpinnerTable } from "@/components/common/SpinnerTable";
import { FaRotateLeft, FaXmark } from "react-icons/fa6";
import { BiFilterAlt } from "react-icons/bi";
import { Pagination } from "@/components/pagination/Pagination";
import type { PaginationDetail } from "@/types/pagination";
import { BaseSelect } from "@/components/select/BaseSelect";
import { BaseButton } from "@/components/button/BaseButton";
import { useSearchParams } from "react-router";
import { useAccountAdminList } from "@/hooks/useAccountAdminList";
import type { AdminAccount } from "@/types/account";
import { BaseDateRangePicker } from "@/components/datepicker/BaseDateRangePicker";
import { renderOptions } from "@/utils/renderOptions";
import { useCategoryList } from "@/hooks/useCategoryList";

export const TourListTable = ({
  tourList,
  isLoading,
  pagination,
}: {
  tourList: TourItem[];
  isLoading: boolean;
  pagination: PaginationDetail;
}) => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
  const { mutate: tourChangeMulti } = useTourChangeMulti({
    setSelectedIds,
    setAction,
  });
  const { mutate: tourDelete, isPending: isPendingTourDelete } =
    useTourDelete();

  const handleCheckAll = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedIds(tourList.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckItem = (id: string, event: any) => {
    const checked = event.target.checked;
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );
  };

  const isDisabled = !action || selectedIds.length === 0;

  const handleChangeMulti = () => {
    const dataFinal = {
      action: action,
      ids: selectedIds,
    };

    tourChangeMulti(dataFinal);
  };

  // Filter
  const { data: adminAccounts } = useAccountAdminList();
  const { data: categories } = useCategoryList();

  const allAdminAccounts: AdminAccount[] =
    adminAccounts?.fullAccountAdminList ?? [];
  const adminAccountOptions = allAdminAccounts.map((item) => ({
    label: item.fullName,
    value: item.id,
  }));

  const categoryTree = categories?.categoryTree ?? [];

  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const createdBy = searchParams.get("createdBy") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const price = searchParams.get("price") || "";
  const category = searchParams.get("category") || "";

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <>
      <div className="flex gap-4">
        {/* Main Table */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap justify-between gap-3 rounded-tl-sm rounded-tr-sm bg-white p-4">
            <Search placeholder="Tìm tour..." />
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpenFilter(!isOpenFilter)}
                className={`border-travel-gray-300 hover:border-travel-primary hover:bg-travel-primary/10 group/btn-filter flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border transition-all duration-300 ${isOpenFilter ? "border-travel-primary bg-travel-primary/10" : "bg-white"}`}
              >
                <BiFilterAlt
                  className={`group-hover/btn-filter:text-travel-primary size-6 ${isOpenFilter ? "text-travel-primary" : "text-travel-secondary/60"}`}
                />
              </button>
              <div className="border-travel-gray-300 text-travel-secondary flex h-9 items-center overflow-hidden rounded-sm border bg-white text-sm font-medium">
                <select
                  value={action}
                  onChange={(event) => setAction(event.target.value)}
                  className="select h-full w-44 border-none px-4"
                >
                  <option value="">Chọn hành động</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                  <option value="delete">Xóa</option>
                </select>
                <button
                  disabled={isDisabled}
                  onClick={handleChangeMulti}
                  className={`border-travel-secondary/20 h-full border-l px-4 ${isDisabled ? "text-travel-secondary/80 cursor-not-allowed" : "text-travel-red cursor-pointer"}`}
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-sm bg-white">
            <table className="text-travel-secondary w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary h-5 w-5 rounded-sm border"
                      checked={
                        tourList.length > 0 &&
                        selectedIds.length === tourList.length
                      }
                      onChange={(event) => handleCheckAll(event)}
                    />
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-bold text-nowrap">
                    Tên tour
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-center text-sm font-bold text-nowrap">
                    Ảnh đại diện
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-bold text-nowrap">
                    Giá
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-bold text-nowrap">
                    Còn lại
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-center text-sm font-bold text-nowrap">
                    Vị trí
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-center text-sm font-bold text-nowrap">
                    Trạng thái
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-bold text-nowrap">
                    Tạo bởi
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-bold text-nowrap">
                    Cập nhật bởi
                  </th>
                  <th className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-bold text-nowrap">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <SpinnerTable colSpan={10} />
                ) : tourList.length === 0 ? (
                  <EmptyTableRow colSpan={10} />
                ) : (
                  tourList.map((item) => {
                    const status = statusList.find(
                      (st) => st.value === item.status,
                    );

                    return (
                      <tr key={item.id} className="">
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary h-5 w-5 rounded-sm border"
                            value={item.id}
                            checked={selectedIds.includes(item.id)}
                            onChange={(event) =>
                              handleCheckItem(item.id, event)
                            }
                          />
                        </td>
                        <td className="border-travel-four w-40 border-b px-4 py-2 text-left text-sm font-medium">
                          <div className="line-clamp-1">{item.name}</div>
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-center text-sm font-medium">
                          <img
                            src={item.avatar || imageDefault}
                            className="border-travel-four mx-auto h-[60px] w-[60px] rounded-md border object-cover"
                          />
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-medium text-nowrap">
                          <div>
                            NL: {item.priceNewAdult.toLocaleString("vi-VN")}đ
                          </div>
                          <div>
                            TE: {item.priceNewChildren.toLocaleString("vi-VN")}đ
                          </div>
                          <div>
                            EB: {item.priceNewBaby.toLocaleString("vi-VN")}đ
                          </div>
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-medium">
                          <div>NL: {item.stockAdult}</div>
                          <div>TE: {item.stockChildren}</div>
                          <div>EB: {item.stockBaby}</div>
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-center text-sm font-medium">
                          {item.position}
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-center text-sm font-medium">
                          <StatusBadge status={status} />
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-medium text-nowrap">
                          <div>{item.createdByFullName}</div>
                          <div>
                            {dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY")}
                          </div>
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-medium text-nowrap">
                          <div>{item.updatedByFullName}</div>
                          <div>
                            {dayjs(item.updatedAt).format("HH:mm - DD/MM/YYYY")}
                          </div>
                        </td>
                        <td className="border-travel-gray-300 border-y px-4 py-2 text-left text-sm font-medium">
                          <div className="border-travel-gray-300 bg-travel-gray-50 inline-flex items-center rounded-sm border">
                            {permissions?.includes("tour-edit") && (
                              <ButtonEdit
                                to={`/${pathAdmin}/tour/edit/${item.id}`}
                              />
                            )}
                            {permissions?.includes("tour-delete") && (
                              <ButtonDelete
                                id={item.id}
                                isPending={isPendingTourDelete}
                                onDelete={(id) => tourDelete(id)}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {tourList.length > 0 && (
            <Pagination pagination={pagination} list={tourList} />
          )}
        </div>

        {/* Filter */}
        {isOpenFilter && (
          <div className="h-full w-[300px] bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-lg font-semibold">Bộ lọc</div>
              <button
                onClick={() => setIsOpenFilter(false)}
                className="cursor-pointer"
              >
                <FaXmark className="text-travel-secondary/60 size-5 hover:text-[#ea0234]" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <BaseSelect
                placeholder="Chọn trạng thái"
                options={[
                  { label: "Hoạt động", value: "active" },
                  { label: "Tạm dừng", value: "inactive" },
                ]}
                value={status}
                onChange={(val) => handleFilter("status", val)}
              />

              <BaseSelect
                placeholder="Chọn người tạo"
                options={adminAccountOptions}
                value={createdBy}
                onChange={(val) => handleFilter("createdBy", val)}
              />

              <BaseSelect
                placeholder="Chọn danh mục"
                children={renderOptions(categoryTree)}
                value={category}
                onChange={(val) => handleFilter("category", val)}
              />

              <BaseSelect
                placeholder="Chọn mức giá"
                options={[
                  { label: "Dưới 5 triệu", value: "0-4999999" },
                  { label: "Từ 5 - 10 triệu", value: "5000000-10000000" },
                  { label: "Từ 10 - 20 triệu", value: "10000000-20000000" },
                  { label: "Trên 20 triệu", value: "20000000-1000000000" },
                ]}
                value={price}
                onChange={(val) => handleFilter("price", val)}
              />

              <BaseDateRangePicker
                value={{ startDate: startDate, endDate: endDate }}
                onChange={({ startDate, endDate }) => {
                  if (startDate) handleFilter("startDate", startDate);
                  if (endDate) handleFilter("endDate", endDate);
                }}
                className="placeholder:text-travel-secondary h-9 w-full rounded-sm border border-[#e0e0e0] px-3 py-2 text-sm font-medium"
              />

              <div className="h-9">
                <BaseButton
                  type="reset"
                  label="Xóa bộ lọc"
                  btnType="danger"
                  icon={<FaRotateLeft className="size-4" />}
                  onClick={handleReset}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
