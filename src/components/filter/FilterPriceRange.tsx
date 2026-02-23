import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export const FilterPriceRange = ({
  filterKey,
  label,
}: {
  filterKey: string;
  label: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Mặc định khoảng giá từ 0 đến 50 triệu
  const DEFAULT_RANGE = [0, 50000000];

  // Hàm helper để parse chuỗi "min-max" từ URL
  const getRangeFromUrl = () => {
    const priceParam = searchParams.get(filterKey); // ví dụ: "1000000-20000000"
    if (priceParam && priceParam.includes("-")) {
      const [min, max] = priceParam.split("-").map(Number);
      return [min, max];
    }
    return DEFAULT_RANGE;
  };

  const [range, setRange] = useState(getRangeFromUrl());

  // Đồng bộ khi URL thay đổi (nhấn Bỏ lọc)
  useEffect(() => {
    setRange(getRangeFromUrl());
  }, [searchParams]);

  const handleUpdateUrl = (values: number[]) => {
    const newParams = new URLSearchParams(searchParams);
    // Gộp thành dạng min-max
    const priceValue = `${values[0]}-${values[1]}`;
    newParams.set(filterKey, priceValue);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="hover:border-travel-primary text-travel-secondary border-travel-gray flex h-9 items-center gap-3 rounded-sm border bg-white px-3 text-sm font-medium hover:shadow-md">
          {label}
          {searchParams.has(filterKey) && (
            <span className="bg-travel-primary/10 text-travel-primary ml-1 rounded-sm px-1 text-[10px] font-bold">
              Đã chọn
            </span>
          )}
          <ChevronDown size={14} className="opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4" align="start" sideOffset={4}>
        <div className="text-travel-secondary space-x-2 text-sm font-medium">
          <span>{range[0].toLocaleString()}đ</span>
          <span>-</span>
          <span>{range[1].toLocaleString()}đ</span>
        </div>

        <Slider
          min={DEFAULT_RANGE[0]}
          max={DEFAULT_RANGE[1]}
          step={500000}
          value={range}
          onValueChange={setRange}
          onValueCommit={handleUpdateUrl}
          className="[&_.bg-primary]:bg-travel-primary [&_.border-primary]:border-travel-primary py-4"
        />

        <button className="border-travel-primary text-travel-primary h-10 w-full cursor-pointer rounded-sm border text-sm font-medium hover:bg-blue-50">
          Áp dụng
        </button>
      </PopoverContent>
    </Popover>
  );
};
