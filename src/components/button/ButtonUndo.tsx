import { RotateCw } from "lucide-react";

type ButtonUndoProps = {
  isPending: boolean;
  onUndo: () => void;
};

export const ButtonUndo = ({ isPending, onUndo }: ButtonUndoProps) => {
  return (
    <button
      type="button"
      aria-label="Khôi phục"
      disabled={isPending}
      onClick={onUndo}
      className="border-travel-gray cursor-pointer border-r px-4 py-2.5"
    >
      <RotateCw size={16} className="text-travel-secondary/60" />
    </button>
  );
};
