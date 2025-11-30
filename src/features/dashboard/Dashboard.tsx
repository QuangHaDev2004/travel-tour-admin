import { PageTitle } from "@/components/pageTitle/PageTitle";
import { RevenueChart } from "./components/RevenueChart";
import { DashboardTable } from "./components/DashboardTable";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";
import { useDashboard } from "./hooks/useDashboard";
import type { Overview } from "@/types/dashboard";
import { DashboardOverview } from "./components/DashboardOverview";

export const Dashboard = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data } = useDashboard();
  const overview: Overview = data?.overview ?? {};

  return (
    <>
      {permissions?.includes("dashboard-view") ? (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Tổng quan" />
          </div>

          <DashboardOverview overview={overview} />

          <RevenueChart />

          <DashboardTable />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
