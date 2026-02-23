import { z } from "zod";

// Category
export const categoryFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên danh mục!"),
  parent: z.string().optional(),
  position: z.coerce.number().optional(),
  status: z.string().optional(),
  avatar: z.any(),
  description: z.string().optional(),
});

export type CategoryFormInputs = z.infer<typeof categoryFormSchema>;

// Option
export type Option = {
  label: string;
  value: string;
};

// Tour
export const tourSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên tour"),
  category: z.string().optional(),
  position: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().min(1, "Vị trí phải lớn hơn hoặc bằng 1").optional(),
  ),
  status: z.string().optional(),
  avatar: z.any(),
  images: z.any(),
  priceAdult: z.coerce.number().optional(),
  priceChildren: z.coerce.number().optional(),
  priceBaby: z.coerce.number().optional(),
  priceNewAdult: z.coerce.number().optional(),
  priceNewChildren: z.coerce.number().optional(),
  priceNewBaby: z.coerce.number().optional(),
  stockAdult: z.coerce.number().optional(),
  stockChildren: z.coerce.number().optional(),
  stockBaby: z.coerce.number().optional(),
  time: z.string().optional(),
  vehicle: z.string().optional(),
  departureDate: z.string().optional(),
  information: z.string().optional(),
  locationsFrom: z.array(z.string()).optional(),
  locationsTo: z.array(z.string()).optional(),
  schedules: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
});

export type TourFormValues = z.infer<typeof tourSchema>;

// Order
export const orderFormSchema = z.object({
  paymentMethod: z.string().optional(),
  paymentStatus: z.string().optional(),
  status: z.string().optional(),
});

export type OrderFormInputs = z.infer<typeof orderFormSchema>;

// Setting Website Info
export const websiteInfoSchema = z.object({
  websiteName: z.string().min(1, "Vui lòng nhập tên website!"),
  phone: z
    .string()
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không đúng định dạng!",
    )
    .or(z.literal("")),
  email: z.string().email("Email không đúng định dạng!").or(z.literal("")),
  address: z.string().optional(),
  facebook: z.string().optional(),
  zalo: z.string().optional(),
  logo: z.any(),
  favicon: z.any(),
});

export type WebsiteInfoInputs = z.infer<typeof websiteInfoSchema>;

// Setting Account Admin
export const accountAdminSchema = z.object({
  fullName: z
    .string()
    .min(1, "Vui lòng nhập họ tên!")
    .min(5, "Họ tên phải có ít nhất 5 ký tự!")
    .max(50, "Họ tên không được vượt quá 50 ký tự!"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại!")
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không đúng định dạng!",
    ),
  role: z.string().optional(),
  positionCompany: z.string().min(1, "Vui lòng nhập chức vụ!"),
  status: z.string().optional(),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu!")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ký tự viết hoa!")
    .regex(/[a-z]/, "Mật khẩu phải chứa ký tự viết thường!")
    .regex(/[0-9]/, "Mật khẩu phải chứa chữ số!")
    .regex(/[^a-zA-Z0-9\s]/, "Mật khẩu phải chứa ký tự đặc biệt!"),
  avatar: z.any(),
});

export type AccountAdminInputs = z.infer<typeof accountAdminSchema>;

export const accountAdminEditSchema = z.object({
  fullName: z
    .string()
    .min(1, "Vui lòng nhập họ tên!")
    .min(5, "Họ tên phải có ít nhất 5 ký tự!")
    .max(50, "Họ tên không được vượt quá 50 ký tự!"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại!")
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không đúng định dạng!",
    ),
  role: z.string().optional(),
  positionCompany: z.string().min(1, "Vui lòng nhập chức vụ!"),
  status: z.string().optional(),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu!")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ký tự viết hoa!")
    .regex(/[a-z]/, "Mật khẩu phải chứa ký tự viết thường!")
    .regex(/[0-9]/, "Mật khẩu phải chứa chữ số!")
    .regex(/[^a-zA-Z0-9\s]/, "Mật khẩu phải chứa ký tự đặc biệt!")
    .or(z.literal("")),
  avatar: z.any(),
});

export type AccountAdminEditInputs = z.infer<typeof accountAdminEditSchema>;

// Setting Role
export const roleSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập nhóm quyền!"),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

export type RoleInputs = z.infer<typeof roleSchema>;

// Profile
export const profileEditSchema = z.object({
  fullName: z
    .string()
    .min(1, "Vui lòng nhập họ tên!")
    .min(5, "Họ tên phải có ít nhất 5 ký tự!")
    .max(50, "Họ tên không được vượt quá 50 ký tự!"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại!")
    .regex(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không đúng định dạng!",
    ),
  avatar: z.any(),
});

export type ProfileEditInputs = z.infer<typeof profileEditSchema>;

export const profileChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu!")
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ký tự viết hoa!")
      .regex(/[a-z]/, "Mật khẩu phải chứa ký tự viết thường!")
      .regex(/[0-9]/, "Mật khẩu phải chứa chữ số!")
      .regex(/[^a-zA-Z0-9\s]/, "Mật khẩu phải chứa ký tự đặc biệt!"),
    confirmPassword: z.string().min(1, "Vui lòng nhập xác nhận mật khẩu!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // báo lỗi tại trường confirmPassword
    error: "Mật khẩu xác nhận không khớp!",
  });

export type ProfileChangePasswordInputs = z.infer<
  typeof profileChangePasswordSchema
>;

// Template
export const templateSchema = z.object({
  dataTourListOne: z.string().optional(),
  dataTourListTwo: z.string().optional(),
});

export type TemplateInputs = z.infer<typeof templateSchema>;

// Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu!"),
  rememberPassword: z.boolean().optional(),
});

export type LoginInputs = z.infer<typeof loginSchema>;

// Register
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Vui lòng nhập họ tên!")
    .min(5, "Họ tên phải có ít nhất 5 ký tự!")
    .max(50, "Họ tên không được vượt quá 50 ký tự!"),
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu!")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ký tự viết hoa!")
    .regex(/[a-z]/, "Mật khẩu phải chứa ký tự viết thường!")
    .regex(/[0-9]/, "Mật khẩu phải chứa chữ số!")
    .regex(/[^a-zA-Z0-9\s]/, "Mật khẩu phải chứa ký tự đặc biệt!"),
  agree: z.boolean().refine((value) => value === true, {
    error: "Bạn phải đồng ý với các điều khoản và điều kiện!",
  }),
});

export type RegisterInputs = z.infer<typeof registerSchema>;

// Forgot Password
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email!")
    .email("Email không đúng định dạng!"),
});

export type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

// OTP Password
export const otpPasswordSchema = z.object({
  otp: z.string().min(1, "Vui lòng nhập mã OTP!"),
});

export type otpPasswordInputs = z.infer<typeof otpPasswordSchema>;

// Reset Password
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu!")
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ký tự viết hoa!")
      .regex(/[a-z]/, "Mật khẩu phải chứa ký tự viết thường!")
      .regex(/[0-9]/, "Mật khẩu phải chứa chữ số!")
      .regex(/[^a-zA-Z0-9\s]/, "Mật khẩu phải chứa ký tự đặc biệt!"),
    confirmPassword: z.string().min(1, "Vui lòng nhập xác nhận mật khẩu!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // báo lỗi tại trường confirmPassword
    error: "Mật khẩu xác nhận không khớp!",
  });

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
