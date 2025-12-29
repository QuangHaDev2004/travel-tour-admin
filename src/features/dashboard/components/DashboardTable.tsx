import type { OrderDetail } from "@/types/order";
import { imageDefault } from "@/constants/common";
import { orderStatusList } from "@/constants/order";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const DashboardTable = ({ orderNew }: { orderNew: OrderDetail[] }) => {
  return (
    <>
      <div className="rounded-md bg-white p-6 sm:p-8">
        <h2 className="text-travel-secondary mb-[30px] text-2xl font-semibold">
          Đơn hàng mới
        </h2>
        <div className="srcoll-table overflow-x-auto">
          <table className="text-travel-secondary w-full min-w-[1076px] border-collapse">
            <thead>
              <tr>
                <th className="bg-travel-gray-50 rounded-tl-xl rounded-bl-xl px-4 py-4 text-left text-sm font-semibold">
                  Mã
                </th>
                <th className="bg-travel-gray-50 px-4 py-4 text-left text-sm font-semibold">
                  Thông tin khách
                </th>
                <th className="bg-travel-gray-50 px-4 py-4 text-left text-sm font-semibold">
                  Danh sách tour
                </th>
                <th className="bg-travel-gray-50 px-4 py-4 text-left text-sm font-semibold">
                  Thanh toán
                </th>
                <th className="bg-travel-gray-50 px-4 py-4 text-left text-sm font-semibold">
                  Trạng thái
                </th>
                <th className="bg-travel-gray-50 rounded-tr-xl rounded-br-xl px-4 py-4 text-right text-sm font-semibold">
                  Ngày đặt
                </th>
              </tr>
            </thead>
            <tbody>
              {orderNew.map((orderDetail) => {
                const status = orderStatusList.find(
                  (item) => item.value === orderDetail.statusInfo.value,
                );

                return (
                  <tr key={orderDetail.id} className="last:[&>td]:border-0">
                    <td className="text-travel-primary border-travel-gray-500 border-b px-4 py-2.5 text-sm font-medium">
                      {orderDetail.orderCode}
                    </td>
                    <td className="border-travel-gray-500 border-b px-4 py-2.5 text-sm font-medium">
                      <div>Họ tên: {orderDetail.fullName}</div>
                      <div>SĐT: {orderDetail.phone}</div>
                      <div>Ghi chú: {orderDetail.note}</div>
                    </td>
                    <td className="border-travel-gray-500 border-b px-4 py-2.5 text-sm font-medium">
                      <div className="flex flex-col gap-2.5">
                        {orderDetail.items.map((item) => (
                          <div
                            key={item.tourId}
                            className="flex items-start gap-2.5"
                          >
                            <div className="h-[76px] w-[76px] overflow-hidden rounded-md">
                              <img
                                src={item.avatar || imageDefault}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="w-40 flex-1">
                              <div className="mb-[3px] line-clamp-1 text-sm font-medium">
                                {item.name}
                              </div>
                              <div className="flex flex-col gap-[3px]">
                                <div className="text-[12px] font-medium">
                                  Người lớn: {item.quantityAdult} x{" "}
                                  {item.priceNewAdult.toLocaleString("vi-VN")}đ
                                </div>
                                <div className="text-[12px] font-medium">
                                  Trẻ em: {item.quantityChildren} x{" "}
                                  {item.priceNewChildren.toLocaleString(
                                    "vi-VN",
                                  )}
                                  đ
                                </div>
                                <div className="text-[12px] font-medium">
                                  Em bé: {item.quantityBaby} x{" "}
                                  {item.priceNewBaby.toLocaleString("vi-VN")}đ
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="border-travel-gray-500 border-b px-4 py-2.5 text-sm font-medium">
                      <div>
                        Tạm tính: {orderDetail.subTotal.toLocaleString("vi-VN")}
                        đ
                      </div>
                      <div>
                        Giảm: {orderDetail.discount.toLocaleString("vi-VN")}đ
                      </div>
                      {/* <div>Mã giảm: TOURMUAHE2024</div> */}
                      <div>
                        Thanh toán: {orderDetail.total.toLocaleString("vi-VN")}đ
                      </div>
                      <div>PTTT: {orderDetail.paymentMethodName}</div>
                      <div>TTTT: {orderDetail.paymentStatusName}</div>
                    </td>
                    <td className="border-travel-gray-500 border-b px-4 py-2.5">
                      <StatusBadge status={status} />
                    </td>
                    <td className="border-travel-gray-500 border-b px-4 py-2.5 text-right text-sm font-medium">
                      <div>{orderDetail.createdAtTime}</div>
                      <div>{orderDetail.createdAtDate}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
