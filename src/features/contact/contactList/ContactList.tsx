import { PageTitle } from "@/components/pageTitle/PageTitle";
import { ContactListTable } from "./ContactListTable";
import { useContactList } from "../hooks/useContactList";
import type { ContactItem } from "@/types/contact";
import { useDeleteContact } from "../hooks/useDeleteContact";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";

export const ContactList = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data, isLoading } = useContactList();
  const contactList: ContactItem[] = data?.contactList ?? [];
  const pagination = data?.pagination ?? {};

  const { mutate: deleteContact, isPending: isDeletingContact } =
    useDeleteContact();

  return (
    <>
      {permissions?.includes("contact-view") ? (
        <>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Thông tin liên hệ" />
          </div>
          <ContactListTable
            data={contactList}
            isLoading={isLoading}
            pagination={pagination}
            tableActions={{
              deleteItem: deleteContact,
              isDeletingItem: isDeletingContact,
            }}
          />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
