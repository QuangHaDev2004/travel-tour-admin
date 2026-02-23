import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  id: string;
  label: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  isRequired?: boolean;
  defaultValue?: string | number;
};

export const BaseInput = ({
  id,
  label,
  register,
  error,
  type = "text",
  placeholder,
  readOnly,
  value,
  isRequired,
  defaultValue,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-travel-label block text-sm font-medium"
      >
        <span>{label}</span>
        {isRequired && <span className="text-travel-error ml-1">*</span>}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        autoComplete="off"
        readOnly={readOnly}
        onWheel={(e) => e.currentTarget.blur()}
        className={`text-travel-secondary bg-travel-gray-3 h-11 w-full rounded-sm border px-4 text-sm font-medium ${error ? "border-travel-error" : "border-travel-gray focus:border-travel-primary hover:border-travel-primary"} `}
      />

      {error && (
        <p className="text-travel-error text-xs font-medium">{error.message}</p>
      )}
    </div>
  );
};
