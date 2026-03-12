type CheckboxItem = Record<string, string>;

type CheckboxListProps = {
  label: string;
  list: CheckboxItem[];
  valueKey: string;
  labelKey: string;
  selectedValues: string[];
  onToggle: (value: string) => void;
};

// Component hiển thị danh sách checkbox dạng scrollable
export const CheckboxList = ({
  label,
  list,
  valueKey,
  labelKey,
  selectedValues,
  onToggle,
}: CheckboxListProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-travel-label block text-sm font-medium">
        {label}
      </label>

      <div className="border-travel-four bg-travel-three flex h-41.5 flex-col gap-2 overflow-y-auto rounded-sm border px-5.75 py-3.5">
        {list.map((item) => {
          const value = item[valueKey];
          const labelText = item[labelKey];

          return (
            <label
              key={value}
              className="label text-travel-secondary flex items-center gap-3 text-sm font-medium"
            >
              <input
                type="checkbox"
                value={value}
                checked={selectedValues.includes(value)}
                onChange={() => onToggle(value)}
                className="checkbox checkbox-primary border-travel-gray hover:border-travel-primary h-4.5 w-4.5 rounded-sm border"
              />
              {labelText}
            </label>
          );
        })}
      </div>
    </div>
  );
};
