/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { pathAdmin } from "@/config/path";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, type OrderFormInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { FormInput } from "@/components/form/FormInput";
import { ButtonSubmit } from "@/components/button/ButtonSubmit";
import { ContextLink } from "@/components/common/ContextLink";
import {
  orderStatusList,
  paymentMethodList,
  paymentStatusList,
} from "@/constants/order";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { useParams } from "react-router";
import type { OrderDetail } from "@/types/order";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { useUpdateOrder } from "../hooks/useUpdateOrder";
import { OrderTourList } from "../components/OrderTourList";
import { OrderSummary } from "../components/OrderSummary";

export const OrderEdit = () => {
  const { id } = useParams();
  const editorRef = useRef<any>(null);
  const { data } = useOrderDetail({ id: id! });
  const orderDetail: OrderDetail = data?.orderDetail ?? {};
  const { mutate, isPending } = useUpdateOrder({ id: id! });

  const { register, reset, handleSubmit } = useForm<OrderFormInputs>({
    resolver: zodResolver(orderFormSchema),
  });

  useEffect(() => {
    if (data?.orderDetail) {
      reset({
        ...data.orderDetail,
      });
    }
  }, [data, reset]);

  const handleOrderForm: SubmitHandler<OrderFormInputs> = (data) => {
    mutate(data);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title={`Đơn hàng: ${orderDetail.orderCode}`} />
        <ContextLink
          text="Quay lại danh sách"
          to={`/${pathAdmin}/order/list`}
        />
      </div>
      <div className="border-travel-secondary/20 overflow-hidden rounded-md border bg-white p-6 shadow-md">
        {orderDetail && (
          <form
            onSubmit={handleSubmit(handleOrderForm)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <FormInput
              id="fullName"
              label="Tên khách hàng"
              defaultValue={orderDetail.fullName}
              readOnly
            />

            <FormInput
              id="phone"
              label="Số điện thoại"
              defaultValue={orderDetail.phone}
              readOnly
            />

            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="note"
                className="text-travel-label mb-1 block text-sm font-semibold"
              >
                Ghi chú
              </label>
              <EditorMCE
                editorRef={editorRef}
                value={orderDetail.note}
                id="note"
              />
            </div>

            <div>
              <label
                htmlFor="paymentMethod"
                className="text-travel-label mb-1 block text-sm font-semibold"
              >
                Phương thức thanh toán
              </label>
              <select
                {...register("paymentMethod")}
                className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
              >
                {paymentMethodList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="paymentStatus"
                className="text-travel-label mb-1 block text-sm font-semibold"
              >
                Trạng thái thanh toán
              </label>
              <select
                {...register("paymentStatus")}
                className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
              >
                {paymentStatusList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="text-travel-label mb-1 block text-sm font-semibold"
              >
                Trạng thái đơn hàng
              </label>
              <select
                {...register("status")}
                className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
              >
                {orderStatusList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              id="createAt"
              label="Ngày đặt"
              type="datetime-local"
              defaultValue={orderDetail.createdAtFormat}
              readOnly
            />

            <OrderTourList orderDetail={orderDetail} />

            <OrderSummary orderDetail={orderDetail} />

            <ButtonSubmit text="Cập nhật" isPending={isPending} />
          </form>
        )}
      </div>
    </>
  );
};
