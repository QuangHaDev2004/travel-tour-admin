import { MoveLeft, Plus, RefreshCw, Trash2 } from "lucide-react";
import { BaseButton } from "./BaseButton";

export const ButtonCreate = ({ to }: { to: string }) => (
  <BaseButton
    to={to}
    label="Tạo mới"
    icon={<Plus size={16} />}
    variant="primary"
  />
);

export const ButtonTrash = ({ to }: { to: string }) => (
  <BaseButton
    to={to}
    label="Thùng rác"
    icon={<Trash2 size={16} />}
    variant="danger"
  />
);

export const ButtonBack = ({ to }: { to: string }) => (
  <BaseButton
    to={to}
    label="Quay lại"
    icon={<MoveLeft size={16} />}
    variant="primary"
  />
);

export const ButtonRefresh = ({ onClick }: { onClick: () => void }) => (
  <BaseButton
    onClick={onClick}
    label="Tải lại"
    icon={<RefreshCw size={16} />}
    variant="default"
  />
);
