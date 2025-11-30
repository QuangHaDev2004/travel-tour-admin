import type { Overview } from "@/types/dashboard";

export const DashboardOverview = ({overview}: {overview: Overview}) => {
  return (
    <>
      <div className="mb-[30px] grid gap-[30px] md:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center justify-center gap-5 rounded-[14px] bg-white py-7">
          <div className="h-[60px] w-[60px] overflow-hidden rounded-[23px]">
            <img
              src={"/assets/images/Icon-user.svg"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-travel-secondary flex flex-col gap-1">
            <span className="text-[16px] font-semibold">
              Tài khoản quản trị
            </span>
            <span className="text-[28px] font-bold">
              {overview?.totalAdmin?.toLocaleString("vi-VN")}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 rounded-[14px] bg-white py-7">
          <div className="h-[60px] w-[60px] overflow-hidden rounded-[23px]">
            <img
              src={"/assets/images/Icon-order.svg"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-travel-secondary flex flex-col gap-1">
            <span className="text-[16px] font-semibold">Đơn hàng</span>
            <span className="text-[28px] font-bold">
              {overview?.totalOrder?.toLocaleString("vi-VN")}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 rounded-[14px] bg-white py-7">
          <div className="h-[60px] w-[60px] overflow-hidden rounded-[23px]">
            <img
              src={"/assets/images/Icon-chart.svg"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-travel-secondary flex flex-col gap-1">
            <span className="text-[16px] font-semibold">Doanh thu</span>
            <span className="text-[28px] font-bold">
              {overview?.totalRevenue?.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
