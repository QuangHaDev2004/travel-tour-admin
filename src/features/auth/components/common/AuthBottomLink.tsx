import { Link } from "react-router";

export const AuthBottomLink = ({
  text,
  to,
  textTo,
}: {
  text: string;
  to: string;
  textTo: string;
}) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-2.5 text-sm">
      <span className="text-travel-secondary/60 font-medium">{text}</span>
      <Link to={to} className="text-travel-primary font-semibold underline">
        {textTo}
      </Link>
    </div>
  );
};
