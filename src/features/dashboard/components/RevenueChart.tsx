import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRevenueChart } from "../hooks/useRevenueChart";
import { useEffect, useMemo, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Biểu đồ doanh thu theo tháng",
    },
  },
  scales: {
    x: { title: { display: true, text: "Ngày" } },
    y: { title: { display: true, text: "Doanh thu (VNĐ)" } },
  },
};

export const RevenueChart = () => {
  const [dataMonthCurrent, setDataMonthCurrent] = useState<number[]>([]);
  const [dataMonthPrevious, setDataMonthPrevious] = useState<number[]>([]);
  const [now, setNow] = useState<Date>(() => new Date());
  const { mutate } = useRevenueChart({
    setDataMonthCurrent,
    setDataMonthPrevious,
  });

  // Ngày hiện tại
  // const now = new Date();

  // Thông tin tháng hiện tại
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Thông tin tháng trước
  const previousMonthDate = new Date(currentYear, now.getMonth() - 1, 1); // chi tiết tháng trước
  const previousMonth = previousMonthDate.getMonth() + 1;
  const previousYear = previousMonthDate.getFullYear();

  // Lấy ra tổng số ngày
  const daysInMonthCurrent = new Date(currentYear, currentMonth, 0).getDate(); // (2025, 12, 0) 0 => 2025/11/ngày cuối cùng
  const daysInMonthPrevious = new Date(
    previousYear,
    previousMonth,
    0,
  ).getDate();
  const days =
    daysInMonthCurrent > daysInMonthPrevious
      ? daysInMonthCurrent
      : daysInMonthPrevious;

  const arrayDay = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= days; i++) {
      arr.push(i);
    }

    return arr;
  }, [days]);

  useEffect(() => {
    const dataFinal = {
      currentMonth,
      currentYear,
      previousMonth,
      previousYear,
      arrayDay,
    };

    mutate(dataFinal);
  }, [
    arrayDay,
    currentMonth,
    currentYear,
    mutate,
    previousMonth,
    previousYear,
  ]);

  const handleFilterMonth = (value: string) => {
    const dateFilter = value ? new Date(value) : new Date();
    setNow(dateFilter);
  };

  const data = {
    labels: arrayDay,
    datasets: [
      {
        label: `Tháng ${currentMonth}/${currentYear}`,
        data: dataMonthCurrent,
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1.5,
      },
      {
        label: `Tháng ${previousMonth}/${previousYear}`,
        data: dataMonthPrevious,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <>
      <div
        className="mb-[30px] rounded-[14px] bg-white p-6 shadow-md sm:p-8"
        style={{
          boxShadow: "6px 6px 54px 0px #0000000D",
        }}
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2.5">
          <h1 className="text-travel-secondary text-2xl font-bold">
            Biểu đồ doanh thu
          </h1>
          <input
            value={now.toISOString().slice(0, 7)}
            onChange={(e) => handleFilterMonth(e.target.value)}
            type="month"
            className="border-four rounded-sm border px-4 py-2 text-xs font-semibold text-[#2B303466]"
          />
        </div>
        <div className="h-[350px]">
          <Line options={options} data={data} className="!h-full !w-full" />
        </div>
      </div>
    </>
  );
};
