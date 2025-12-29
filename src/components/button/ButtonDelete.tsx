import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const ButtonDelete = ({
  id,
  isPending,
  onDelete,
}: {
  id: string;
  isPending: boolean;
  onDelete: (id: string) => void;
}) => {
  const handleDelete = () => {
    MySwal.fire({
      title: <p className="text-lg font-semibold">Bạn có chắc muốn xóa?</p>,
      html: (
        <p className="text-gray-600">
          Hành động này của bạn <b>không thể hoàn tác</b>.
        </p>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="cursor-pointer px-4 py-2.5"
    >
      <FaTrashCan className="text-error text-[15px]" />
    </button>
  );
};
