"use client";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { RevenueChart } from "./components/RevenueChart";
import { TopTourChart } from "./components/TopTourChart";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";

export const Report = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  return (
    <>
      {permissions?.includes("report-view") ? (
        <>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Báo cáo và thống kê" />
          </div>

          <RevenueChart />
          <TopTourChart />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
