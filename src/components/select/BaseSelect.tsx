import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BaseSelect = ({
  placeholder,
  options,
  children,
  value,
  onChange,
}: {
  placeholder: string;
  options?: { label: string; value: string }[];
  children?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="hover:border-travel-primary data-placeholder:text-travel-secondary h-full w-full rounded-sm border-[#e0e0e0] font-medium">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {children
            ? children
            : options?.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
