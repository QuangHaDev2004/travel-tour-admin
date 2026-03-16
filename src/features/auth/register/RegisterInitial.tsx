import { pathAdmin } from "@/config/path";
import { AuthBottomLink } from "../components/common/AuthBottomLink";
import { AuthDescription } from "../components/common/AuthDescription";
import { AuthTitle } from "../components/common/AuthTitle";
import { CircleCheckBig } from "lucide-react";

export const RegisterInitial = () => {
  return (
    <>
      <CircleCheckBig className="mx-auto mb-4 size-16 text-green-500" />
      <AuthTitle title="Tài khoản đã được khởi tạo" />
      <AuthDescription text="Vui lòng chờ phê duyệt của quản trị viên" />
      <AuthBottomLink
        text="Đã được phê duyệt?"
        to={`/${pathAdmin}/account/login`}
        textTo="Đăng nhập"
      />
    </>
  );
};
