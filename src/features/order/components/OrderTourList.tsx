import type { OrderDetail } from "@/types/order";

export const OrderTourList = ({
  orderDetail,
}: {
  orderDetail: OrderDetail;
}) => {
  return (
    <div>
      <label className="text-travel-label mb-2.5 block text-sm font-medium">
        Danh sách tour
      </label>
      {orderDetail?.items && orderDetail?.items.length > 0 && (
        <div className="flex flex-col gap-4">
          {orderDetail.items.map((item) => (
            <div key={item.tourId} className="flex gap-3">
              <div className="h-28.75 w-28.75 overflow-hidden rounded-md">
                <img src={item.avatar} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-0.75 flex-1">
                <div className="text-travel-secondary/80 text-sm font-medium">
                  {item.name}
                </div>
                <div className="text-travel-secondary/80 text-xs font-medium">
                  Người lớn: {item.quantityAdult} x{" "}
                  {item.priceNewAdult.toLocaleString("vi-VN")}đ
                </div>
                <div className="text-travel-secondary/80 text-xs font-medium">
                  Trẻ em: {item.quantityChildren} x{" "}
                  {item.priceNewChildren.toLocaleString("vi-VN")}đ
                </div>
                <div className="text-travel-secondary/80 text-xs font-medium">
                  Em bé: {item.quantityBaby} x{" "}
                  {item.priceNewBaby.toLocaleString("vi-VN")}đ
                </div>
                <div className="text-travel-secondary/80 text-xs font-medium">
                  Ngày khởi hành: {item.departureDateFormat}
                </div>
                <div className="text-travel-secondary/80 text-xs font-medium">
                  Khởi hành tại: {item.locationsFromName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
