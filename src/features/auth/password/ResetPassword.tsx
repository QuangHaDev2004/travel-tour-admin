import { pathAdmin } from "@/config/path";
import { AuthTitle } from "../components/common/AuthTitle";
import { AuthDescription } from "../components/common/AuthDescription";
import { FormResetPassword } from "../components/form/FormResetPassword";
import { AuthBottomLink } from "../components/common/AuthBottomLink";

export const ResetPassword = () => {
  return (
    <>
      <AuthTitle title="Đổi mật khẩu" />
      <AuthDescription text="Vui lòng nhập mật khẩu để tiếp tục" />
      <FormResetPassword />
      <AuthBottomLink
        text="Bạn đã nhớ mật khẩu?"
        to={`/${pathAdmin}/account/login`}
        textTo="Đăng nhập"
      />
    </>
  );
};
