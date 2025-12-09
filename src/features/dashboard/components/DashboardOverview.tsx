import type { Overview } from "@/types/dashboard";
import { OverviewSkeleton } from "./OverviewSkeleton";

export const DashboardOverview = ({
  overview,
  isLoading,
}: {
  overview: Overview;
  isLoading: boolean;
}) => {
  console.log(overview);

  return (
    <>
      {isLoading ? (
        <OverviewSkeleton />
      ) : (
        <div className="mb-[30px] grid gap-[30px] md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-md bg-white p-4">
            <div className="flex items-center justify-center gap-5">
              <div className="h-14 w-14 overflow-hidden rounded-lg">
                <img
                  src={"/assets/images/Icon-chart.svg"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-travel-dark flex flex-col gap-1">
                <span className="text-[16px] font-medium opacity-60">
                  Doanh thu
                </span>
                <span className="text-2xl font-semibold">
                  {overview?.totalRevenue?.value?.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
            <div className="text-travel-dark/60 mt-1.5 flex items-center justify-center gap-2 text-center text-sm font-medium">
              {overview?.totalRevenue?.growth > 0 ? (
                <img src="/assets/images/icon-growth-up.svg" alt="Icon Up" />
              ) : (
                <img src="/assets/images/icon-growth-down.svg" alt="Icon Down" />
              )}
              <span
                className={`${overview?.totalRevenue?.growth > 0 ? "text-travel-success" : "text-travel-pink"}`}
              >
                {Math.abs(overview?.totalRevenue?.growth)}%
              </span>
              so với tháng trước
            </div>
          </div>
          <div className="rounded-md bg-white p-4">
            <div className="flex items-center justify-center gap-5">
              <div className="h-14 w-14 overflow-hidden rounded-lg">
                <img
                  src={"/assets/images/Icon-order.svg"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-travel-dark flex flex-col gap-1">
                <span className="text-[16px] font-medium opacity-60">
                  Đơn hàng
                </span>
                <span className="text-2xl font-semibold">
                  {overview?.totalOrder?.value?.toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
            <div className="text-travel-dark/60 mt-1.5 flex items-center justify-center gap-2 text-center text-sm font-medium">
              {overview?.totalOrder?.growth > 0 ? (
                <img src="/assets/images/icon-growth-up.svg" alt="Icon Up" />
              ) : (
                <img src="/assets/images/icon-growth-down.svg" alt="Icon Down" />
              )}
              <span
                className={`${overview?.totalOrder?.growth > 0 ? "text-travel-success" : "text-travel-pink"}`}
              >
                {Math.abs(overview?.totalOrder?.growth)}%
              </span>
              so với tháng trước
            </div>
          </div>
          <div className="rounded-md bg-white p-4">
            <div className="flex items-center justify-center gap-5">
              <div className="h-14 w-14 overflow-hidden rounded-lg">
                <img
                  src={"/assets/images/Icon-user.svg"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-travel-dark flex flex-col gap-1">
                <span className="text-[16px] font-medium opacity-60">
                  Tài khoản quản trị
                </span>
                <span className="text-2xl font-semibold">
                  {overview?.totalAdmin?.value?.toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
            {/* <div className="text-travel-dark/60 mt-1.5 flex items-center justify-center gap-2 text-center text-sm font-medium">
              {overview?.totalRevenue?.growth > 0 ? (
                <img src="/assets/images/icon-growth-up.svg" alt="Icon Up" />
              ) : (
                <img src="/assets/images/icon-growth-down.svg" alt="Icon Up" />
              )}
              <span className="text-travel-pink">
                {Math.abs(overview?.totalRevenue?.growth)}%
              </span>
              so với tháng trước
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};
