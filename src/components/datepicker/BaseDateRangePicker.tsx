import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { vi } from "date-fns/locale";
import { format, parseISO } from "date-fns";

registerLocale("vi", vi);

type DateRangeValue = {
  startDate: string | null;
  endDate: string | null;
};

type BaseDateRangePickerProps = {
  className: string;
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
};

export const BaseDateRangePicker = ({
  className,
  value,
  onChange,
}: BaseDateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(value.startDate ? parseISO(value.startDate) : null);
    setEndDate(value.endDate ? parseISO(value.endDate) : null);
  }, [value.endDate, value.startDate]);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    onChange({
      startDate: start ? format(start, "yyyy-MM-dd") : null,
      endDate: end ? format(end, "yyyy-MM-dd") : null,
    });
  };

  return (
    <DatePicker
      locale={vi}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      dateFormat="dd/MM/yyyy"
      placeholderText="Chọn khoảng ngày"
      selectsRange
      className={className}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="text-travel-secondary flex items-center justify-between px-4 py-1 text-sm">
          <button
            type="button"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white disabled:opacity-40 disabled:shadow-none!"
            style={{ boxShadow: "0 3px 8px rgba(0, 0, 0, .24)" }}
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <FaArrowLeftLong className="size-3" />
          </button>
          <span className="font-semibold">
            Tháng {date.getMonth() + 1} - {date.getFullYear()}
          </span>
          <button
            type="button"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white"
            style={{ boxShadow: "0 3px 8px rgba(0, 0, 0, .24)" }}
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <FaArrowRightLong className="size-3" />
          </button>
        </div>
      )}
    />
  );
};
