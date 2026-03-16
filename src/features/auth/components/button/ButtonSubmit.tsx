export const ButtonSubmit = ({
  label,
  isPending,
}: {
  label: string;
  isPending: boolean;
}) => {
  return (
    <button
      className={`h-11 w-full rounded-sm text-[16px] font-bold text-white capitalize transition-all duration-300 ${isPending ? "cursor-not-allowed bg-gray-400" : "bg-travel-primary cursor-pointer hover:bg-blue-500"}`}
    >
      {isPending ? "Đang xử lý" : label}
    </button>
  );
};
