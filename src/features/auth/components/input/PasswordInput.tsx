import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type PasswordInputProps = {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export const PasswordInput = ({
  id,
  label,
  register,
  error,
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-travel-secondary/80 mb-1 inline-block text-sm font-semibold"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          {...register}
          className={`bg-travel-three h-11 w-full rounded-sm border p-4 text-sm font-semibold ${error ? "border-travel-error" : "border-travel-four focus:border-travel-primary"}`}
        />
        <div
          onClick={() => setVisible(!visible)}
          className="text-travel-secondary/60 absolute top-1/2 right-4 size-5 -translate-y-1/2 cursor-pointer"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
      {error && (
        <p className="text-travel-error mt-1 text-xs font-semibold">
          {error.message}
        </p>
      )}
    </div>
  );
};
