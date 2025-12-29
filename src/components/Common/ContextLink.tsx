import { Link } from "react-router";

export const ContextLink = ({ text, to }: { text: string; to: string }) => {
  return (
    <Link
      to={to}
      className="text-travel-primary flex justify-center text-lg font-semibold underline"
    >
      {text}
    </Link>
  );
};
