export const EmptyTableRow = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-travel-secondary h-[306px] p-4 text-center"
      >
        <img
          src="/assets/images/img-empty.png"
          alt="Not Found"
          className="mx-auto mb-4 h-48 object-contain"
        />
        <p className="text-lg font-semibold">Không tìm thấy dữ liệu phù hợp</p>
        <p className="text-sm font-medium italic">
          Thử thao tác lại một lần nữa nhé
        </p>
      </td>
    </tr>
  );
};
