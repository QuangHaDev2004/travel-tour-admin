import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ButtonCopy = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    toast.success("Đã copy email.");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="border-travel-four cursor-pointer border-r px-[16.5px] py-2.5"
    >
      {copied ? (
        <ClipboardCheck size={16} className="text-green-500" />
      ) : (
        <Clipboard size={16} />
      )}
    </button>
  );
};
