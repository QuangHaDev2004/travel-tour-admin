/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ReportTitle } from "./ReportTitle";
import { ButtonRefresh } from "@/components/button/ActionButtons";
import { useTopTourQuantity } from "../hooks/useTopTourQuantity";
import { useTopTourRevenue } from "../hooks/useTopTourRevenue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterType } from "@/types/report";
import { useState } from "react";
import { TableLoading } from "@/components/table/TableLoading";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/**
 * Hàm tạo options cho biểu đồ
 * @param xLabel: nhãn hiển thị trên trục X
 * @param rawData: mảng dữ liệu gốc từ API, dùng để lấy tourName trong tooltip
 * context chứa thông tin về điểm dữ liệu đang hover.
 * context[0] vì chỉ có 1 dataset
 */
const options = (xLabel: string, rawData: any[]) => ({
  indexAxis: "y" as const, // chuyển biểu đồ từ cột dọc sang cột NGANG
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        title: (context: any) => {
          const index = context[0].dataIndex; // dataIndex: vị trí của bar đang hover
          const item = rawData[index]; // Lấy object dữ liệu gốc tương ứng từ API
          return `#${index + 1} - ${item?.tourName}`;
        },
        label: (context: any) => {
          return `${xLabel}: ${context.raw?.toLocaleString()}`; // context.raw: giá trị số của bar đang hover
        },
      },
    },
  },
  scales: {
    x: { title: { display: true, text: xLabel } },
    y: { title: { display: true, text: "Tour" } },
  },
});

/**
 * Màu sắc cho từng bar
 */
const BAR_COLORS = [
  "rgba(255, 99,  132, 0.7)",
  "rgba(255, 159,  64, 0.7)",
  "rgba(255, 205,  86, 0.7)",
  "rgba( 75, 192, 192, 0.7)",
  "rgba( 54, 162, 235, 0.7)",
];

interface TopTourBarChartProps {
  title: string;
  data: any[];
  isLoading: boolean;
  refetch: () => void;
  labelKey: string; // Tên field lấy giá trị số
  xAxisLabel: string; // Nhãn trục X
  datasetLabel: string; // Nhãn dataset
  type: FilterType;
  setType: (value: FilterType) => void;
}

/**
 * Hàm chuyển đổi giá trị type thành nhãn hiển thị trên Select trigger
 */
const getTypeLabel = (type: FilterType) => {
  switch (type) {
    case "day":
      return "ngày";
    case "week":
      return "tuần";
    case "month":
      return "tháng";
    case "year":
      return "năm";
    default:
      return "";
  }
};

/**
 * Component biểu đồ cột ngang
 */
const TopTourBarChart = ({
  title,
  data,
  isLoading,
  refetch,
  labelKey,
  xAxisLabel,
  datasetLabel,
  type,
  setType,
}: TopTourBarChartProps) => {
  const labels = data?.map((_, index: number) => `Top ${index + 1}`) || [];
  const values = data?.map((item: any) => item[labelKey]) || [];

  const chartData = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data: values,
        backgroundColor: BAR_COLORS,
        borderRadius: 2,
      },
    ],
  };

  return (
    <div className="rounded-sm bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <ReportTitle title={title} />

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
        <div className="flex h-72 items-center justify-center">
          <TableLoading />
        </div>
      ) : (
        <div className="h-72">
          <Bar
            options={options(xAxisLabel, data)}
            data={chartData}
            className="h-full! w-full!"
          />
        </div>
      )}
    </div>
  );
};

/** Component chính */
export const TopTourChart = () => {
  // State lưu loại bộ lọc hiện tại, mặc định là "month"
  const [typeQty, setTypeQty] = useState<FilterType>("month");
  const [typeRev, setTypeRev] = useState<FilterType>("month");

  // Top 5 theo số lượng
  const {
    data: quantityData,
    isLoading: loadingQty,
    refetch: refetchQty,
  } = useTopTourQuantity({ type: typeQty });

  // Top 5 theo doanh thu
  const {
    data: revenueData,
    isLoading: loadingRev,
    refetch: refetchRev,
  } = useTopTourRevenue({ type: typeRev });

  const topTourQuantity = quantityData?.topTourQuantity ?? [];
  const topTourRevenue = revenueData?.topTourRevenue ?? [];

  return (
    <>
      {/* Biểu đồ 1: Theo số lượng */}
      <TopTourBarChart
        title="Top 5 tour bán chạy theo số lượng"
        data={topTourQuantity}
        isLoading={loadingQty}
        refetch={refetchQty}
        labelKey="totalQuantity"
        xAxisLabel={`Số lượng (vé) - theo ${getTypeLabel(typeQty)}`}
        datasetLabel="Số lượng bán"
        type={typeQty}
        setType={setTypeQty}
      />

      {/* Biểu đồ 2: Theo doanh thu */}
      <div className="mt-6">
        <TopTourBarChart
          title="Top 5 tour bán chạy theo doanh thu"
          data={topTourRevenue}
          isLoading={loadingRev}
          refetch={refetchRev}
          labelKey="totalRevenue"
          xAxisLabel={`Doanh thu (VNĐ) - theo ${getTypeLabel(typeRev)}`}
          datasetLabel="Doanh thu"
          type={typeRev}
          setType={setTypeRev}
        />
      </div>
    </>
  );
};
