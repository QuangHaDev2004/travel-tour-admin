import { PageTitle } from "@/components/pageTitle/PageTitle";
import { RevenueChart } from "./components/RevenueChart";
import { TopTourChart } from "./components/TopTourChart";

export const Report = () => {
  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Báo cáo và thống kê" />
      </div>

      <RevenueChart />
      <TopTourChart />
    </>
  );
};
