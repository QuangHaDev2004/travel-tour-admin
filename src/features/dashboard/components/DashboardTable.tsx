import { Badge } from "@/components/badge/Badge";

export const DashboardTable = () => {
  return (
    <>
      <div
        className="rounded-[14px] bg-white p-6 sm:p-8"
        style={{
          boxShadow: "6px 6px 54px 0px #0000000D",
        }}
      >
        <h2 className="text-travel-secondary mb-[30px] text-2xl font-bold">
          Đơn hàng mới
        </h2>
        <div className="srcoll-table overflow-x-auto">
          <table className="text-travel-secondary w-full min-w-[1076px] border-collapse">
            <thead>
              <tr>
                <th className="bg-travel-table-head rounded-tl-xl rounded-bl-xl px-6 py-4 text-left text-sm font-bold">
                  Mã
                </th>
                <th className="bg-travel-table-head px-6 py-4 text-left text-sm font-bold">
                  Thông tin khách
                </th>
                <th className="bg-travel-table-head px-6 py-4 text-left text-sm font-bold">
                  Danh sách tour
                </th>
                <th className="bg-travel-table-head px-6 py-4 text-left text-sm font-bold">
                  Thanh toán
                </th>
                <th className="bg-travel-table-head px-6 py-4 text-left text-sm font-bold">
                  Trạng thái
                </th>
                <th className="bg-travel-table-head rounded-tr-xl rounded-br-xl px-6 py-4 text-right text-sm font-bold">
                  Ngày đặt
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="last:[&>td]:border-0">
                <td className="text-travel-primary border-four border-b px-6 py-2.5 text-sm font-bold">
                  OD000001
                </td>
                <td className="border-travel-four border-b px-6 py-2.5 text-sm font-semibold">
                  <div>Họ tên: Lê Văn A</div>
                  <div>SĐT: 0123456789</div>
                  <div>Ghi chú: Test...</div>
                </td>
                <td className="border-travel-four border-b px-6 py-2.5 text-sm font-semibold">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="h-[76px] w-[76px] overflow-hidden rounded-md">
                        <img
                          src="/assets/images/ha-long.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="mb-[3px] text-sm font-semibold">
                          Tour Hạ Long
                        </div>
                        <div className="flex flex-col gap-[3px]">
                          <div className="text-[12px] font-semibold">
                            Người lớn: 3 x 1.500.000đ
                          </div>
                          <div className="text-[12px] font-semibold">
                            Trẻ em: 2 x 1.300.000đ
                          </div>
                          <div className="text-[12px] font-semibold">
                            Em bé: 2 x 1.000.000đ
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="h-[76px] w-[76px] overflow-hidden rounded-md">
                        <img
                          src="/assets/images/ha-long.jpg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="mb-[3px] text-sm font-semibold">
                          Tour Hạ Long
                        </div>
                        <div className="flex flex-col gap-[3px]">
                          <div className="text-[12px] font-semibold">
                            Người lớn: 3 x 1.500.000đ
                          </div>
                          <div className="text-[12px] font-semibold">
                            Trẻ em: 2 x 1.300.000đ
                          </div>
                          <div className="text-[12px] font-semibold">
                            Em bé: 2 x 1.000.000đ
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-travel-four border-b px-6 py-2.5 text-sm font-semibold">
                  <div>Tổng tiền: 10.000.000đ</div>
                  <div>Giảm: 400.000đ</div>
                  <div>Mã giảm: TOURMUAHE2024</div>
                  <div>Thanh toán: 9.600.000đ</div>
                  <div>PTTT: Ví Momo</div>
                  <div>TTTT: Đã thanh toán</div>
                </td>
                <td className="border-travel-four border-b px-6 py-2.5">
                  <Badge className="badge-yellow" content="Khởi tạo" />
                </td>
                <td className="border-travel-four border-b px-6 py-2.5 text-right text-sm font-semibold">
                  <div>16:20</div>
                  <div>01/01/2024</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
