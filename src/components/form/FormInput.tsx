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

export const FormInput = ({
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
    <div>
      <label
        htmlFor={id}
        className="text-travel-label mb-1 block text-sm font-medium"
      >
        <span>{label}</span>
        {isRequired && <span className="text-travel-error ml-1">*</span>}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete="off"
        readOnly={readOnly}
        value={value}
        onWheel={(e) => e.currentTarget.blur()}
        min={0}
        className={`text-travel-secondary bg-travel-three h-12 w-full rounded-sm border px-5 text-sm font-medium ${error ? "border-travel-error" : "border-travel-four focus:border-travel-primary"} `}
      />
      {error && (
        <p className="text-travel-error mt-1 text-sm font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
};
