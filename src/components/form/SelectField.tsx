import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

export const SelectField = ({
  name,
  label,
  register,
  options,
  children,
}: {
  name: string;
  label: string;
  register: UseFormRegisterReturn;
  options?: Option[];
  children?: ReactNode;
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-travel-label mb-1 block text-sm font-medium"
      >
        {label}
      </label>
      <select
        {...register}
        className="select text-travel-secondary h-12 w-full border-[#D5D5D5] bg-[#F5F6FA] px-5 text-sm font-medium"
      >
        {options &&
          options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}

        {children}
      </select>
    </div>
  );
};
