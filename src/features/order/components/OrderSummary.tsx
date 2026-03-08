import type { OrderDetail } from "@/types/order";

export const OrderSummary = ({ orderDetail }: { orderDetail: OrderDetail }) => {
  return (
    <div>
      <label className="text-travel-label mb-2.5 block text-sm font-medium">
        Thanh toán
      </label>
      {orderDetail && (
        <div className="text-travel-secondary flex flex-col gap-0.75 text-sm font-medium">
          <div>Tạm tính: {orderDetail?.subTotal?.toLocaleString("vi-VN")}đ</div>
          <div>Giảm: {orderDetail?.discount?.toLocaleString("vi-VN")}đ</div>
          {/* <div>Mã giảm: TOURMUAHE2024</div> */}
          <div>
            <span>Tổng tiền: </span>
            <span className="font-semibold text-[#EF3826]">
              {orderDetail?.total?.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
