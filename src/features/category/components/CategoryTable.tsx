/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { useState } from "react";
import { pathAdmin } from "@/config/path";
import { statusList } from "@/constants/status";
import { imageDefault } from "@/constants/common";
import { Search } from "@/components/common/Search";
import type { CategoryItem } from "@/types/category";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { useCategoryDelete } from "../hooks/useCategoryDelete";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { SpinnerTable } from "@/components/common/SpinnerTable";
import { EmptyTableRow } from "@/components/table/EmptyTableRow";
import { useCategoryChangeMulti } from "../hooks/useCategoryChangeMulti";

export const CategoryTable = ({
  categoryList,
  isLoading,
}: {
  categoryList: CategoryItem[];
  isLoading: boolean;
}) => {
  const { mutate, isPending } = useCategoryDelete();
  const { mutate: changeMulti } = useCategoryChangeMulti();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");

  const handleCheckAll = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedIds(categoryList.map((item: CategoryItem) => item.id));
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

    changeMulti(dataFinal);

    setAction("");
    setSelectedIds([]);
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="border-travel-secondary/20 text-travel-secondary flex h-10 items-center overflow-hidden rounded-4xl border bg-white text-sm font-medium">
          <select
            value={action}
            onChange={(event) => setAction(event.target.value)}
            className="select h-full w-[160px] border-none px-4"
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
        <Search placeholder="Nhập tên danh mục..." />
      </div>

      <div className="srcoll-table border-travel-four mb-[15px] overflow-hidden overflow-x-auto rounded-[14px] border bg-white">
        <table className="text-travel-secondary w-full min-w-[1141px] border-collapse">
          <thead>
            <tr>
              <th className="border-travel-four border-b p-4 text-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary h-5 w-5 rounded-md border"
                  checked={
                    categoryList.length > 0 &&
                    selectedIds.length === categoryList.length
                  }
                  onChange={(event) => handleCheckAll(event)}
                />
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-bold">
                Tên danh mục
              </th>
              <th className="border-travel-four border-b p-4 text-center text-sm font-bold">
                Ảnh đại diện
              </th>
              <th className="border-travel-four border-b p-4 text-center text-sm font-bold">
                Vị trí
              </th>
              <th className="border-travel-four border-b p-4 text-center text-sm font-bold">
                Trạng thái
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-bold">
                Tạo bởi
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-bold">
                Cập nhật bởi
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-bold">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SpinnerTable colSpan={8} />
            ) : categoryList.length === 0 ? (
              <EmptyTableRow colSpan={8} />
            ) : (
              <>
                {categoryList.map((item: CategoryItem) => {
                  const status = statusList.find(
                    (st) => st.value === item.status,
                  );

                  return (
                    <tr key={item.id} className="last:[&>td]:border-0">
                      <td className="border-travel-four border-b px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary h-5 w-5 rounded-md border"
                          value={item.id}
                          checked={selectedIds.includes(item.id)}
                          onChange={(event) => handleCheckItem(item.id, event)}
                        />
                      </td>
                      <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-medium">
                        {item.name}
                      </td>
                      <td className="border-travel-four border-b px-4 py-2 text-center text-sm font-medium">
                        <img
                          src={item.avatar || imageDefault}
                          className="border-travel-four mx-auto h-[60px] w-[60px] rounded-md border object-cover"
                        />
                      </td>
                      <td className="border-travel-four border-b px-4 py-2 text-center text-sm font-medium">
                        {item.position}
                      </td>
                      <td className="border-travel-four border-b px-4 py-2 text-center text-sm font-medium">
                        <StatusBadge status={status} />
                      </td>
                      <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-medium">
                        <div>{item.createdByFullName}</div>
                        <div>
                          {dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY")}
                        </div>
                      </td>
                      <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-medium">
                        <div>{item.updatedByFullName}</div>
                        <div>
                          {dayjs(item.updatedAt).format("HH:mm - DD/MM/YYYY")}
                        </div>
                      </td>
                      <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-medium">
                        <div className="border-travel-four inline-flex items-center rounded-lg border bg-[#FAFBFD]">
                          <ButtonEdit
                            to={`/${pathAdmin}/category/edit/${item.id}`}
                          />
                          <ButtonDelete
                            id={item.id}
                            isPending={isPending}
                            onDelete={(id) => mutate(id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
