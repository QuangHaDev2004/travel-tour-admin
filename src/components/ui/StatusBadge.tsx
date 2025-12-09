export const StatusBadge = ({
  status,
}: {
  status?: { color: string; colorBg: string; label: string };
}) => {
  return (
    <div
      className="flex h-7 w-24 items-center justify-center rounded-4xl text-xs font-semibold"
      style={{
        color: status?.color,
        backgroundColor: status?.colorBg,
      }}
    >
      {status?.label}
    </div>
  );
};
