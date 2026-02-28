import { createBrowserRouter } from "react-router";
import { pathAdmin } from "@/config/path";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Dashboard } from "@/features/dashboard";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
} from "@/features/category";
import { OrderEdit, OrderList } from "@/features/order";
import { UserList } from "@/features/user";
import { ContactList } from "@/features/contact";
import {
  SettingAccountAdminCreate,
  SettingAccountAdminEdit,
  SettingAccountAdminList,
  SettingList,
  SettingRoleCreate,
  SettingRoleEdit,
  SettingRoleList,
  SettingWebsiteInfo,
} from "@/features/setting";
import { ProfileChangePassword, ProfileEdit } from "@/features/profile";
import { Template } from "@/features/template";
import { NotFound } from "@/features/error";
import { AccountLayout } from "@/layouts/AccountLayout";
import {
  ForgotPassword,
  Login,
  OtpPassword,
  Register,
  RegisterInitial,
  ResetPassword,
} from "@/features/auth";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import {
  TourCreatePage,
  TourEditPage,
  TourListPage,
  TourTrashPage,
} from "@/pages/tour";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: `/${pathAdmin}/dashboard`,
        element: <Dashboard />,
      },
      {
        path: `/${pathAdmin}/category/list`,
        element: <CategoryList />,
      },
      {
        path: `/${pathAdmin}/category/create`,
        element: <CategoryCreate />,
      },
      {
        path: `/${pathAdmin}/category/edit/:id`,
        element: <CategoryEdit />,
      },
      {
        path: `/${pathAdmin}/tour/list`,
        element: <TourListPage />,
      },
      {
        path: `/${pathAdmin}/tour/create`,
        element: <TourCreatePage />,
      },
      {
        path: `/${pathAdmin}/tour/edit/:id`,
        element: <TourEditPage />,
      },
      {
        path: `/${pathAdmin}/tour/trash`,
        element: <TourTrashPage />,
      },
      {
        path: `/${pathAdmin}/order/list`,
        element: <OrderList />,
      },
      {
        path: `/${pathAdmin}/order/edit/:id`,
        element: <OrderEdit />,
      },
      {
        path: `/${pathAdmin}/user/list`,
        element: <UserList />,
      },
      {
        path: `/${pathAdmin}/contact/list`,
        element: <ContactList />,
      },
      {
        path: `/${pathAdmin}/setting/list`,
        element: <SettingList />,
      },
      {
        path: `/${pathAdmin}/setting/website-info`,
        element: <SettingWebsiteInfo />,
      },
      {
        path: `/${pathAdmin}/setting/account-admin/list`,
        element: <SettingAccountAdminList />,
      },
      {
        path: `/${pathAdmin}/setting/account-admin/create`,
        element: <SettingAccountAdminCreate />,
      },
      {
        path: `/${pathAdmin}/setting/account-admin/edit/:id`,
        element: <SettingAccountAdminEdit />,
      },
      {
        path: `/${pathAdmin}/setting/role/list`,
        element: <SettingRoleList />,
      },
      {
        path: `/${pathAdmin}/setting/role/create`,
        element: <SettingRoleCreate />,
      },
      {
        path: `/${pathAdmin}/setting/role/edit/:id`,
        element: <SettingRoleEdit />,
      },
      {
        path: `/${pathAdmin}/profile/edit`,
        element: <ProfileEdit />,
      },
      {
        path: `/${pathAdmin}/profile/change-password`,
        element: <ProfileChangePassword />,
      },
      {
        path: `/${pathAdmin}/template`,
        element: <Template />,
      },
    ],
  },
  {
    element: <AccountLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: `/${pathAdmin}/account/login`,
        element: <Login />,
      },
      {
        path: `/${pathAdmin}/account/register`,
        element: <Register />,
      },
      {
        path: `/${pathAdmin}/account/forgot-password`,
        element: <ForgotPassword />,
      },
      {
        path: `/${pathAdmin}/account/otp-password`,
        element: <OtpPassword />,
      },
      {
        path: `/${pathAdmin}/account/reset-password`,
        element: <ResetPassword />,
      },
      {
        path: `/${pathAdmin}/account/register-initial`,
        element: <RegisterInitial />,
      },
    ],
  },
]);
