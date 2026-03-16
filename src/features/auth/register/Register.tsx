import { pathAdmin } from "@/config/path";
import { AuthBottomLink } from "../components/common/AuthBottomLink";
import { AuthDescription } from "../components/common/AuthDescription";
import { AuthTitle } from "../components/common/AuthTitle";
import { FormRegister } from "../components/form/FormRegister";

export const Register = () => {
  return (
    <>
      <AuthTitle title="Đăng ký" />
      <AuthDescription text="Tạo một tài khoản để tiếp tục" />
      <FormRegister />
      <AuthBottomLink
        text="Bạn đã có tài khoản?"
        to={`/${pathAdmin}/account/login`}
        textTo="Đăng nhập"
      />
    </>
  );
};
