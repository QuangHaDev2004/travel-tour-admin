import { pathAdmin } from "@/config/path";
import { AuthTitle } from "../components/common/AuthTitle";
import { AuthDescription } from "../components/common/AuthDescription";
import { FormLogin } from "../components/form/FormLogin";
import { AuthBottomLink } from "../components/common/AuthBottomLink";

export const Login = () => {
  return (
    <>
      <AuthTitle title="Đăng nhập" />
      <AuthDescription text="Vui lòng nhập email và mật khẩu để tiếp tục" />
      <FormLogin />
      <AuthBottomLink
        text="Bạn chưa có tài khoản?"
        to={`/${pathAdmin}/account/register`}
        textTo="Tạo tài khoản"
      />
    </>
  );
};
