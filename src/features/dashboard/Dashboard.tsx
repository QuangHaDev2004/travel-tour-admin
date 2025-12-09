import type { Overview } from "@/types/dashboard";
import { useDashboard } from "./hooks/useDashboard";
import { useAuthStore } from "@/stores/useAuthStore";
import { RevenueChart } from "./components/RevenueChart";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { DashboardTable } from "./components/DashboardTable";
import { NoPermission } from "@/components/common/NoPermission";
import { DashboardOverview } from "./components/DashboardOverview";
import type { OrderDetail } from "@/types/order";

export const Dashboard = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data, isLoading } = useDashboard();
  const overview: Overview = data?.overview ?? {};
  const orderNew: OrderDetail[] = data?.orderNew ?? [];

  return (
    <>
      {permissions?.includes("dashboard-view") ? (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Tổng quan" />
          </div>

          <DashboardOverview overview={overview} isLoading={isLoading} />

          <RevenueChart />

          <DashboardTable orderNew={orderNew} />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
