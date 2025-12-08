import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextInputsProps = {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export const TextInput = ({
  id,
  label,
  type = "text",
  register,
  error,
}: TextInputsProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-travel-secondary/80 mb-1 inline-block text-lg font-semibold"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className={`bg-travel-three h-12 w-full rounded-lg border p-4 text-sm font-semibold ${error ? "border-travel-error" : "border-travel-four focus:border-travel-primary"}`}
      />
      {error && (
        <p className="text-travel-error mt-1 text-sm font-semibold">{error.message}</p>
      )}
    </div>
  );
};
