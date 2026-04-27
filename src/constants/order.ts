export const orderStatusList = [
  {
    label: "Chờ xác nhận",
    value: "pending_confirm",
    color: "#ffa756",
    colorBg: "rgba(255, 167, 86, 0.2)",
  },
  {
    label: "Hoàn thành",
    value: "done",
    color: "#00b69b",
    colorBg: "rgba(0, 182, 155, 0.2)",
  },
  {
    label: "Đã hủy",
    value: "cancel",
    color: "#ef3826",
    colorBg: "rgba(239, 56, 38, 0.2)",
  },
  {
    label: "Hủy tự động",
    value: "cancel_expired",
    color: "#ef3826",
    colorBg: "rgba(239, 56, 38, 0.2)",
  },
];

export const paymentMethodList = [
  {
    label: "Tiền mặt",
    value: "money",
  },
  // {
  //   label: "Chuyển khoản",
  //   value: "bank",
  // },

  {
    label: "ZaloPay",
    value: "zalopay",
  },
  // {
  //   label: "VNPay",
  //   value: "vnpay",
  // },
];

export const paymentStatusList = [
  {
    label: "Chưa thanh toán",
    value: "unpaid",
  },
  {
    label: "Đã thanh toán",
    value: "paid",
  },
];
