export const TableEmpty = () => {
  return (
    <>
      <img
        src="/assets/images/img-empty.png"
        alt="Not Found"
        className="mx-auto mb-4 h-36 object-contain"
      />
      <p className="text-lg font-semibold">Không tìm thấy dữ liệu phù hợp</p>
      <p className="text-sm font-medium italic">
        Thử thao tác lại một lần nữa nhé
      </p>
    </>
  );
};
