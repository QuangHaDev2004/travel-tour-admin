export const SpinnerTable = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="h-[306px]">
        <div className="border-t-travel-primary border-travel-secondary/20 mx-auto h-8 w-8 animate-spin rounded-full border-4"></div>
      </td>
    </tr>
  );
};
