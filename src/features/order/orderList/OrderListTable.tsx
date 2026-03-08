/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseTable } from "@/components/table/BaseTable";
import type { PaginationDetail } from "@/types/pagination";
import { columns } from "./OrderListColumns";
import type { OrderDetail } from "@/types/order";
import { OrderListToolbar } from "./OrderListToolbar";

type OrderListTableProps = {
  data: OrderDetail[];
  isLoading: boolean;
  pagination: PaginationDetail;
  deleteOrder: any;
  isDeletingOrder: boolean;
};

export const OrderListTable = ({
  data,
  isLoading,
  pagination,
  deleteOrder,
  isDeletingOrder,
}: OrderListTableProps) => {
  return (
    <BaseTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      pagination={pagination}
      meta={{
        deleteOrder: deleteOrder,
        isDeletingOrder: isDeletingOrder,
      }}
      toolbar={<OrderListToolbar />}
    />
  );
};
