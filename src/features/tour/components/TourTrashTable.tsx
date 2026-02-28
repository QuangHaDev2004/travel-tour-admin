/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/badge/Badge";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { Search } from "@/components/common/Search";
import { EmptyTableRow } from "@/components/table/EmptyTableRow";
import { useState } from "react";
import { useTourTrashList } from "../hooks/useTourTrashList";
import dayjs from "dayjs";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useTourUndo } from "../hooks/useTourUndo";
import { useTourDestroy } from "../hooks/useTourDestroy";
import { useTourChangeMulti } from "../hooks/useTourChangeMulti";

export const TourTrashTable = () => {
  const { tourTrashList } = useTourTrashList();
  const { mutate: mutateTourUndo, isPending: isPendingTourUndo } =
    useTourUndo();
  const { mutate: mutateTourDestroy, isPending: isPendingTourDestroy } =
    useTourDestroy();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [action, setAction] = useState<string>("");
  const { mutate: mutateTourChangeMulti } = useTourChangeMulti({
    setSelectedIds,
    setAction,
  });

  const handleCheckAll = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedIds(tourTrashList.map((item) => item.id));
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

    mutateTourChangeMulti(dataFinal);
  };

  const handleUndo = (id: string) => {
    mutateTourUndo(id);
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4">
        {/* <div className="border-travel-secondary/20 text-travel-secondary flex h-10 items-center overflow-hidden rounded-4xl border bg-white text-sm font-semibold shadow-md">
          <select
            value={action}
            onChange={(event) => setAction(event.target.value)}
            className="select h-full w-[160px] border-none px-4"
          >
            <option value="">Chọn hành động</option>
            <option value="undo">Khôi phục</option>
            <option value="destroy">Xóa vĩnh viễn</option>
          </select>
          <button
            disabled={isDisabled}
            onClick={handleChangeMulti}
            className={`border-travel-secondary/20 h-full border-l px-4 ${isDisabled ? "text-travel-secondary/80 cursor-not-allowed" : "text-travel-red cursor-pointer"}`}
          >
            Áp dụng
          </button>
        </div> */}
        <Search placeholder="Nhập tên tour..." />
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
                    tourTrashList.length > 0 &&
                    selectedIds.length === tourTrashList.length
                  }
                  onChange={(event) => handleCheckAll(event)}
                />
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Tên tour
              </th>
              <th className="border-travel-four border-b p-4 text-center text-sm font-extrabold">
                Ảnh đại diện
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Giá
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Còn lại
              </th>
              <th className="border-travel-four border-b p-4 text-center text-sm font-extrabold">
                Vị trí
              </th>
              <th className="border-travel-four border-b p-4 text-center text-sm font-extrabold">
                Trạng thái
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Tạo bởi
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Xóa bởi
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {tourTrashList.length > 0 ? (
              tourTrashList.map((item) => (
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
                  <td className="border-travel-four border-b px-4 py-2 text-center text-sm font-semibold">
                    <img
                      src={
                        item.avatar ||
                        "https://placehold.co/60x60/white/black?text=No+Image"
                      }
                      className="border-travel-four mx-auto h-[60px] w-[60px] rounded-md border object-cover"
                    />
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    <div>NL: {item.priceNewAdult.toLocaleString("vi-VN")}đ</div>
                    <div>
                      TE: {item.priceNewChildren.toLocaleString("vi-VN")}đ
                    </div>
                    <div>EB: {item.priceNewBaby.toLocaleString("vi-VN")}đ</div>
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    <div>NL: {item.stockAdult}</div>
                    <div>TE: {item.stockChildren}</div>
                    <div>EB: {item.stockBaby}</div>
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-center text-sm font-semibold">
                    {item.position}
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-center text-sm font-semibold">
                    {item.status === "active" ? (
                      <Badge className="badge-green" content="Hoạt động" />
                    ) : (
                      <Badge className="badge-red" content="Tạm dừng" />
                    )}
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    <div>{item.createdByFullName}</div>
                    <div>
                      {dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY")}
                    </div>
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    <div>{item.updatedByFullName}</div>
                    <div>
                      {dayjs(item.updatedAt).format("HH:mm - DD/MM/YYYY")}
                    </div>
                  </td>
                  <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                    <div className="border-travel-four inline-flex items-center rounded-lg border bg-[#FAFBFD]">
                      <button
                        disabled={isPendingTourUndo}
                        onClick={() => handleUndo(item.id)}
                        className="border-travel-four cursor-pointer border-r px-[16.5px] py-[10px]"
                      >
                        <FaArrowRotateLeft className="text-[15px]" />
                      </button>
                      <ButtonDelete
                        id={item.id}
                        isPending={isPendingTourDestroy}
                        onDelete={(id) => mutateTourDestroy(id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyTableRow colSpan={9} />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
