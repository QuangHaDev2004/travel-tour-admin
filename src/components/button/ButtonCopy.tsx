import { useState } from "react";
import { FaRegClipboard } from "react-icons/fa6";
import { LuClipboardCheck } from "react-icons/lu";
import { toast } from "sonner";

export const ButtonCopy = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    toast.success("Đã copy email!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="border-travel-four cursor-pointer border-r px-[16.5px] py-2.5"
    >
      {copied ? (
        <LuClipboardCheck className="text-[15px] text-green-500" />
      ) : (
        <FaRegClipboard className="text-[15px]" />
      )}
    </button>
  );
};
