export const ButtonSubmit = ({
  text,
  isPending,
}: {
  text: string;
  isPending: boolean;
}) => {
  return (
    <div className="col-span-1 text-center md:col-span-2">
      <button
        disabled={isPending}
        className={`h-12 w-[275px] rounded-md text-lg font-bold text-white ${isPending ? "cursor-not-allowed bg-gray-400" : "bg-travel-primary hover:bg-travel-primary/90 cursor-pointer"}`}
      >
        {isPending ? "Đang xử lý..." : text}
      </button>
    </div>
  );
};
