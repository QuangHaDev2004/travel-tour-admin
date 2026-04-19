/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportTitle } from "./ReportTitle";
import { ButtonRefresh } from "@/components/button/ActionButtons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo, useState } from "react";
import { useRevenueReport } from "../hooks/useRevenueReport";
import { TableLoading } from "@/components/table/TableLoading";
import type { FilterType } from "@/types/report";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

/** Nhãn hiển thị trên trục X tương ứng với từng loại bộ lọc */
const xAxisLabelMap: Record<FilterType, string> = {
  day: "Giờ",
  week: "Thứ",
  month: "Ngày",
  year: "Tháng",
};

/** Nhãn hiển thị trên legend/tooltip tương ứng với từng loại bộ lọc */
const datasetLabelMap: Record<FilterType, string> = {
  day: "ngày",
  week: "tuần",
  month: "tháng",
  year: "năm",
};

export const RevenueChart = () => {
  // State lưu loại bộ lọc hiện tại, mặc định là "month"
  const [type, setType] = useState<FilterType>("month");

  // Fetch dữ liệu doanh thu theo loại bộ lọc
  const { data, isLoading, refetch } = useRevenueReport({ type });

  /**
   * Cấu hình biểu đồ — được tính lại mỗi khi type thay đổi.
   * Dùng useMemo để tránh tạo object mới không cần thiết khi re-render không liên quan đến type.
   */
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" as const },
      },
      scales: {
        x: { title: { display: true, text: xAxisLabelMap[type] } },
        y: { title: { display: true, text: "Doanh thu (VNĐ)" } },
      },
    }),
    [type],
  );

  /**
   * Chuyển đổi giá trị id từ API sang nhãn hiển thị trên trục X.
   * - day:   id là giờ trong ngày (0–23)       → "0h", "1h", ...
   * - week:  id là thứ trong tuần (1–7)         → "CN", "T2", ..., "T7"
   *          API: 1 = CN, 2 = T2, ..., 7 = T7
   *          Trừ 1 để chuyển từ 1-based (API) sang 0-based (index mảng JS)
   * - month: id là ngày trong tháng (1–31)      → "1", "2", ...
   * - year:  id là tháng trong năm (1–12)       → "Tháng 1", "Tháng 2", ...
   */
  const formatLabel = (value: number) => {
    if (type === "day") return `${value}h`;
    if (type === "week")
      return ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][value - 1];
    if (type === "month") return `${value}`;
    if (type === "year") return `Tháng ${value}`;
    return value;
  };

  // Tạo danh sách nhãn trục X từ dữ liệu API
  const labels = data?.map((i: any) => formatLabel(i.id)) || [];

  // Tạo danh sách giá trị doanh thu tương ứng
  const values = data?.map((i: any) => i.totalRevenue) || [];

  // Cấu hình dữ liệu cho biểu đồ
  const chartData = {
    labels,
    datasets: [
      {
        label: `Doanh thu theo ${datasetLabelMap[type]}`,
        data: values,
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="mb-6 rounded-sm bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <ReportTitle title="Biểu đồ báo cáo doanh thu" />

        <div className="flex flex-wrap items-center gap-2">
          <ButtonRefresh onClick={refetch} />
          <Select
            value={type}
            onValueChange={(value) => setType(value as FilterType)}
          >
            <SelectTrigger className="focus-visible:border-travel-primary hover:border-travel-primary w-30 rounded-sm focus-visible:ring-0">
              <SelectValue placeholder="Lọc theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="day">Ngày</SelectItem>
                <SelectItem value="week">Tuần</SelectItem>
                <SelectItem value="month">Tháng</SelectItem>
                <SelectItem value="year">Năm</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="flex h-100 items-center justify-center">
          <TableLoading />
        </div>
      ) : (
        <div className="h-100">
          <Line
            options={options}
            data={chartData}
            className="h-full! w-full!"
          />
        </div>
      )}
    </div>
  );
};
