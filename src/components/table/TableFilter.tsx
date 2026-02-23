import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TableFilterProps = {
  label: string;
  filterKey: string;
  options: {
    label: string;
    value: string;
  }[];
};

export const TableFilter = ({
  label,
  filterKey,
  options,
}: TableFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(filterKey) || "";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(filterKey, value);
    else params.delete(filterKey);
    params.delete("page");
    setSearchParams(params);
  };

  const hasValue = currentValue !== "";

  return (
    <Select value={currentValue} onValueChange={handleFilter}>
      <SelectTrigger
        className={`hover:border-travel-primary w-44 rounded-sm bg-white font-medium ${hasValue ? "text-travel-primary border-travel-primary" : "text-travel-secondary border-travel-gray hover:shadow-md"}`}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent
        align="end"
        className="max-h-75"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
