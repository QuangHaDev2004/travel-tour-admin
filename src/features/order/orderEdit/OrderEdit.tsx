/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  orderStatusList,
  paymentMethodList,
  paymentStatusList,
} from "@/constants/order";
import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, type OrderFormInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { useParams } from "react-router";
import type { OrderDetail } from "@/types/order";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { useUpdateOrder } from "../hooks/useUpdateOrder";
import { OrderTourList } from "../components/OrderTourList";
import { OrderSummary } from "../components/OrderSummary";
import { ButtonBack } from "@/components/button/ActionButtons";
import { BaseInput } from "@/components/form/BaseInput";
import { BaseSelect } from "@/components/form/BaseSelect";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";

export const OrderEdit = () => {
  const { id } = useParams();
  const editorRef = useRef<any>(null);
  const { data } = useOrderDetail({ id: id! });
  const orderDetail: OrderDetail = data?.orderDetail ?? {};
  const { mutate, isPending } = useUpdateOrder({ id: id! });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormInputs>({
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title={`Đơn hàng: ${orderDetail.orderCode}`} />
        <ButtonBack />
      </div>
      <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
        {orderDetail && (
          <form
            onSubmit={handleSubmit(handleOrderForm)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <BaseInput
              id="fullName"
              label="Tên khách hàng"
              defaultValue={orderDetail.fullName}
              readOnly
            />

            <BaseInput
              id="phone"
              label="Số điện thoại"
              defaultValue={orderDetail.phone}
              readOnly
            />

            <div className="col-span-1 flex flex-col gap-1 md:col-span-2">
              <label className="text-travel-label block text-sm font-medium">
                Ghi chú
              </label>

              <EditorMCE
                id="note"
                value={orderDetail.note}
                editorRef={editorRef}
              />
            </div>

            <BaseSelect
              id="paymentMethod"
              label="Phương thức thanh toán"
              register={register("paymentMethod")}
              error={errors.paymentMethod}
            >
              {paymentMethodList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </BaseSelect>

            <BaseSelect
              id="paymentStatus"
              label="Trạng thái thanh toán"
              register={register("paymentStatus")}
              error={errors.paymentStatus}
            >
              {paymentStatusList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </BaseSelect>

            <BaseSelect
              id="status"
              label="Trạng thái đơn hàng"
              register={register("status")}
              error={errors.status}
            >
              {orderStatusList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </BaseSelect>

            <BaseInput
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
