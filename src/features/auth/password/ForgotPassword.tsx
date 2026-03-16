import { pathAdmin } from "@/config/path";
import { AuthBottomLink } from "../components/common/AuthBottomLink";
import { AuthDescription } from "../components/common/AuthDescription";
import { AuthTitle } from "../components/common/AuthTitle";
import { FormForgotPassword } from "../components/form/FormForgotPassword";

export const ForgotPassword = () => {
  return (
    <>
      <AuthTitle title="Quên mật khẩu" />
      <AuthDescription text="Vui lòng nhập email để tiếp tục" />
      <FormForgotPassword />
      <AuthBottomLink
        text="Bạn đã nhớ mật khẩu?"
        to={`/${pathAdmin}/account/login`}
        textTo="Đăng nhập"
      />
    </>
  );
};
