const styles = {
  danger: " border-travel-red text-travel-red hover:bg-travel-red/10",
};

export const BaseButton = ({
  label,
  type = "button",
  btnType,
  icon,
  onClick,
}: {
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  btnType: "danger";
  icon?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-sm border text-sm ${styles[btnType]}`}
    >
      {icon}
      {label}
    </button>
  );
};
