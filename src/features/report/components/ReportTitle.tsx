type ReportTitleProps = {
  title: string;
};

export const ReportTitle = ({ title }: ReportTitleProps) => {
  return (
    <div className="text-travel-secondary text-lg font-semibold">{title}</div>
  );
};
