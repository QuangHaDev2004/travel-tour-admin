import { pathAdmin } from "@/config/path";
import { AuthBottomLink } from "../components/common/AuthBottomLink";
import { AuthDescription } from "../components/common/AuthDescription";
import { AuthTitle } from "../components/common/AuthTitle";
import { FormOtpPassword } from "../components/form/FormOtpPassword";

export const OtpPassword = () => {
  return (
    <>
      <AuthTitle title="Nhập mã OTP" />
      <AuthDescription text="Vui lòng nhập mã OTP để tiếp tục" />
      <FormOtpPassword />
      <AuthBottomLink
        text="Bạn đã nhớ mật khẩu?"
        to={`/${pathAdmin}/account/login`}
        textTo="Đăng nhập"
      />
    </>
  );
};
