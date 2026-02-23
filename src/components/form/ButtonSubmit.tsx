type ButtonSubmitProps = {
  text: string;
  isPending?: boolean;
};

export const ButtonSubmit = ({ text, isPending }: ButtonSubmitProps) => {
  return (
    <div className="col-span-1 text-center md:col-span-2">
      <button
        disabled={isPending}
        className={`h-11 w-60 rounded-sm text-[16px] font-semibold text-white ${isPending ? "cursor-not-allowed bg-gray-400" : "bg-travel-primary cursor-pointer hover:bg-blue-600"}`}
      >
        {isPending ? "Đang xử lý..." : text}
      </button>
    </div>
  );
};
