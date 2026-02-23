import type { ReactNode } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type BaseSelectProps = {
  id: string;
  label: string;
  children: ReactNode;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  isRequired?: boolean;
};

export const BaseSelect = ({
  id,
  label,
  register,
  children,
  error,
  isRequired,
}: BaseSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-travel-label block text-sm font-medium"
      >
        <span>{label}</span>
        {isRequired && <span className="text-travel-error ml-1">*</span>}
      </label>
      <select
        {...register}
        className={`select bg-travel-three border-travel-gray text-travel-secondary h-11 w-full rounded-sm border px-4 text-sm font-medium ${error ? "border-travel-error" : "border-travel-gray hover:border-travel-primary"} `}
      >
        {children}
      </select>

      {error && (
        <p className="text-travel-error text-xs font-medium">{error.message}</p>
      )}
    </div>
  );
};
