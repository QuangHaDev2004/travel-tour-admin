type LocationCheckboxListProps = {
  label: string;
  cityList: { _id: string; name: string }[];
  selectedValues: string[];
  onToggle: (id: string) => void;
};

export const LocationCheckboxList = ({
  label,
  cityList,
  selectedValues,
  onToggle,
}: LocationCheckboxListProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-travel-label block text-sm font-medium">
        {label}
      </label>
      <div className="border-travel-four bg-travel-three flex h-41.5 flex-col gap-2 overflow-y-auto rounded-sm border px-5.75 py-3.5">
        {cityList.map((item) => (
          <label
            key={item._id}
            className="label text-travel-secondary flex items-center gap-3 text-sm font-medium"
          >
            <input
              checked={selectedValues.includes(item._id)}
              value={item._id}
              onChange={() => onToggle(item._id)}
              type="checkbox"
              className="checkbox checkbox-primary border-travel-gray hover:border-travel-primary h-4.5 w-4.5 rounded-sm border"
            />
            {item.name}
          </label>
        ))}
      </div>
    </div>
  );
};
