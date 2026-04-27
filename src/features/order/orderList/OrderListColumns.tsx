/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseBadge } from "@/components/badge/BaseBadge";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { pathAdmin } from "@/config/path";
import { imageDefault } from "@/constants/common";
import { orderStatusList } from "@/constants/order";
import type { OrderDetail } from "@/types/order";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrderDetail>[] = [
  {
    accessorKey: "orderCode",
    id: "Mã",
    header: () => <div className="font-semibold">Mã</div>,
    cell: ({ row }) => (
      <div className="text-travel-primary w-30 truncate font-medium capitalize">
        {row.original.orderCode}
      </div>
    ),
  },
  {
    accessorKey: "customerInfo",
    id: "Thông tin khách",
    header: () => <div className="font-semibold">Thông tin khách</div>,
    cell: ({ row }) => {
      const { fullName, phone, note } = row.original;

      return (
        <div className="w-40">
          <div>Họ tên: {fullName}</div>
          <div>SĐT: {phone}</div>
          <div className="truncate">Ghi chú: {note || "Không có"}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "tourList",
    id: "Danh sách tour",
    header: () => <div className="font-semibold">Danh sách tour</div>,
    cell: ({ row }) => {
      const items = row.original.items;

      return (
        <>
          <div className="flex flex-col gap-2.5">
            {items.map((item) => (
              <div key={item.tourId} className="flex items-start gap-2.5">
                <div className="h-19 w-19 overflow-hidden rounded-md">
                  <img
                    src={item.avatar || imageDefault}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-0.75 w-36 truncate text-sm">
                    {item.name}
                  </div>
                  <div className="flex flex-col gap-0.75">
                    <div className="text-xs">
                      Người lớn: {item.quantityAdult} x{" "}
                      {item.priceNewAdult?.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="text-xs">
                      Trẻ em: {item.quantityChildren} x{" "}
                      {item.priceNewChildren?.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="text-xs">
                      Em bé: {item.quantityBaby} x{" "}
                      {item.priceNewBaby?.toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "paymentInfo",
    id: "Thanh toán",
    header: () => <div className="font-semibold">Thanh toán</div>,
    cell: ({ row }) => {
      const {
        subTotal,
        discount,
        total,
        paymentMethodName,
        paymentStatusName,
      } = row.original;

      return (
        <>
          <div>Tạm tính: {subTotal?.toLocaleString("vi-VN")}đ</div>
          <div>Giảm: {discount?.toLocaleString("vi-VN")}đ</div>
          <div>Tổng tiền: {total?.toLocaleString("vi-VN")}đ</div>
          <div>PTTT: {paymentMethodName}</div>
          <div>TTTT: {paymentStatusName}</div>
        </>
      );
    },
  },
  {
    accessorKey: "status",
    id: "Trạng thái",
    header: () => <div className="font-semibold">Trạng thái</div>,
    cell: ({ row }) => {
      const statusInfo = row.original.statusInfo;
      const status = orderStatusList.find(
        (st) => st.value === statusInfo.value,
      );

      return <BaseBadge status={status} />;
    },
  },
  {
    accessorKey: "createdAt",
    id: "Ngày đặt",
    header: () => <div className="text-center font-semibold">Ngày đặt</div>,
    cell: ({ row }) => {
      const { createdAtTime, createdAtDate } = row.original;

      return (
        <div className="text-center">
          <div>{createdAtTime}</div>
          <div>{createdAtDate}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="font-semibold">Hành động</div>,
    enableHiding: false,
    cell: ({ row, table }) => {
      const item = row.original;
      const meta = table.options.meta as any;
      const isPaid = item.paymentStatusName === "Đã thanh toán";

      return (
        <div className="flex items-center justify-center">
          <div className="border-travel-gray bg-travel-gray-2 inline-flex items-center rounded-sm border">
            <ButtonEdit to={`/${pathAdmin}/order/edit/${item.id}`} />
            {!isPaid && (
              <ButtonDelete
                id={item.id}
                isPending={meta?.isDeletingOrder}
                onDelete={(id) => meta?.deleteOrder(id)}
              />
            )}
          </div>
        </div>
      );
    },
  },
];
