/* eslint-disable @typescript-eslint/no-explicit-any */
const CUSTOMER_TYPES = [
  { label: "Người lớn", name: "Adult" },
  { label: "Trẻ em", name: "Children" },
  { label: "Em bé", name: "Baby" },
];

type TourInputGroupProps = {
  title: string;
  namePrefix: string;
  register: any;
};

export const TourInputGroup = ({
  title,
  namePrefix,
  register,
}: TourInputGroupProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-travel-label block text-sm font-medium">
        {title}
      </label>

      <div className="flex flex-col gap-1.5">
        {CUSTOMER_TYPES.map((item) => (
          <div key={item.name} className="flex items-center gap-5">
            <label className="text-travel-label block w-22.25 text-sm font-medium">
              {item.label}
            </label>

            <input
              {...register(`${namePrefix}${item.name}`)}
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
              autoComplete="off"
              className="border-travel-gray hover:border-travel-primary bg-travel-three text-travel-secondary h-11 flex-1 rounded-sm border px-4 text-sm font-medium"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
