export const StatusBadge = ({
  status,
}: {
  status?: { color: string; colorBg: string; label: string };
}) => {
  return (
    <div
      className="inline-block rounded-4xl px-5 py-1.5 text-center text-xs font-semibold text-nowrap"
      style={{
        color: status?.color,
        backgroundColor: status?.colorBg,
      }}
    >
      {status?.label}
    </div>
  );
};
