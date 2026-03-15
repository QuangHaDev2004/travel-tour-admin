import { getContactList } from "@/services/contact";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export const useContactList = () => {
  const [searchParams] = useSearchParams();

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value) params[key] = value;
  });

  return useQuery({
    queryKey: ["contactList", params],
    queryFn: () => getContactList(params),
  });
};
