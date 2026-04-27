import { useSearchParams } from "react-router";
import { Search } from "@/components/common/Search";
import { TableFilter } from "@/components/table/TableFilter";

export const OrderListToolbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const arrFilterKey = ["orderStatus", "paymentMethod", "paymentStatus"];

  const isFiltering = Array.from(searchParams.keys()).some((key) =>
    arrFilterKey.includes(key),
  );

  const handleResetFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Search placeholder="Tìm mã đơn hàng..." />

      <TableFilter
        label="Trạng thái đơn hàng"
        filterKey="orderStatus"
        options={[
          { label: "Chờ xác nhận", value: "pending_confirm" },
          { label: "Hoàn thành", value: "done" },
          { label: "Đã hủy", value: "cancel" },
          { label: "Hủy tự động", value: "cancel_expired" },
        ]}
        customStyle="w-48"
      />

      <TableFilter
        label="Phương thức thanh toán"
        filterKey="paymentMethod"
        options={[
          { label: "Tiền mặt", value: "money" },
          // { label: "Chuyển khoản", value: "bank" },
          // { label: "VNPay", value: "vnpay" },
          { label: "ZaloPay", value: "zalopay" },
        ]}
        customStyle="w-54"
      />

      <TableFilter
        label="Trạng thái thanh toán"
        filterKey="paymentStatus"
        options={[
          { label: "Đã thanh toán", value: "paid" },
          { label: "Chưa thanh toán", value: "unpaid" },
        ]}
        customStyle="w-50"
      />

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
