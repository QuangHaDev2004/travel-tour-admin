/* eslint-disable @typescript-eslint/no-explicit-any */
import { pathAdmin } from "@/config/path";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { EmptyTableRow } from "@/components/table/EmptyTableRow";
import { Search } from "@/components/common/Search";
import { useRoleList } from "../hooks/useRoleList";
import { useMemo, useState } from "react";
import type { RoleItem } from "@/types/setting";

export const RoleTable = () => {
  const { data } = useRoleList();
  const roleList: RoleItem[] = useMemo(
    () => data?.roleList ?? [],
    [data?.roleList],
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");

  const handleCheckAll = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedIds(roleList.map((item) => item.id));
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

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="border-travel-secondary/20 text-travel-secondary flex h-10 items-center overflow-hidden rounded-4xl border bg-white text-sm font-semibold shadow-md">
          <select
            value={action}
            onChange={(event) => setAction(event.target.value)}
            className="select h-full w-[160px] border-none px-4"
          >
            <option value="">Chọn hành động</option>
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
        <Search placeholder="Nhập tên nhóm quyền..." />
      </div>

      <div className="srcoll-table border-travel-four mb-[15px] overflow-hidden overflow-x-auto rounded-[14px] border bg-white shadow-md">
        <table className="text-travel-secondary w-full min-w-[1141px] border-collapse">
          <thead>
            <tr>
              <th className="border-travel-four border-b p-4 text-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary border"
                  checked={
                    roleList.length > 0 &&
                    selectedIds.length === roleList.length
                  }
                  onChange={(event) => handleCheckAll(event)}
                />
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Tên nhóm quyền
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Mô tả ngắn
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {roleList.length > 0 ? (
              roleList.map((item) => (
                <tr key={item.id} className="last:[&>td]:border-0">
                  <td className="border-travel-four border-b px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary border"
                      value={item.id}
                      checked={selectedIds.includes(item.id)}
                      onChange={(event) => handleCheckItem(item.id, event)}
                    />
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    {item.name}
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    {item.description}
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    <div className="border-travel-four inline-flex items-center rounded-lg border bg-[#FAFBFD]">
                      <ButtonEdit
                        to={`/${pathAdmin}/setting/role/edit/${item.id}`}
                      />
                      <ButtonDelete
                        endpoint={`/${pathAdmin}/setting/role/delete`}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyTableRow colSpan={3} />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
