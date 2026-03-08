import { PageTitle } from "@/components/pageTitle/PageTitle";
import { OrderListTable } from "./OrderListTable";
import { useOrderList } from "../hooks/useOrderList";
import { useDeleteOrder } from "../hooks/useDeleteOrder";
import { ButtonRefresh } from "@/components/button/ActionButtons";

export const OrderList = () => {
  const { data, isLoading, refetch } = useOrderList();
  const orderList = data?.orderList ?? [];
  const pagination = data?.pagination ?? {};

  // Xóa đơn hàng
  const { mutate: deleteOrder, isPending: isDeletingOrder } = useDeleteOrder();

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Quản lý đơn hàng" />
        <ButtonRefresh onClick={refetch} />
      </div>

      <OrderListTable
        data={orderList}
        isLoading={isLoading}
        pagination={pagination}
        deleteOrder={deleteOrder}
        isDeletingOrder={isDeletingOrder}
      />
    </>
  );
};
