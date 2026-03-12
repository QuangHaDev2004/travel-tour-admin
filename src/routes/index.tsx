import { createBrowserRouter } from "react-router";
import { pathAdmin } from "@/config/path";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Dashboard } from "@/features/dashboard";
import { UserList } from "@/features/user";
import { ContactList } from "@/features/contact";
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
import {
  CategoryCreatePage,
  CategoryEditPage,
  CategoryListPage,
} from "@/pages/category";
import { OrderEditPage, OrderListPage } from "@/pages/order";
import {
  AccountAdminCreatePage,
  AccountAdminEditPage,
  AccountAdminListPage,
  RoleCreatePage,
  RoleEditPage,
  RoleListPage,
  SettingListPage,
  WebsiteInfoPage,
} from "@/pages/setting";

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
        element: <CategoryListPage />,
      },
      {
        path: `/${pathAdmin}/category/create`,
        element: <CategoryCreatePage />,
      },
      {
        path: `/${pathAdmin}/category/edit/:id`,
        element: <CategoryEditPage />,
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
        element: <OrderListPage />,
      },
      {
        path: `/${pathAdmin}/order/edit/:id`,
        element: <OrderEditPage />,
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
        element: <SettingListPage />,
      },
      {
        path: `/${pathAdmin}/setting/website-info`,
        element: <WebsiteInfoPage />,
      },
      {
        path: `/${pathAdmin}/setting/account-admin/list`,
        element: <AccountAdminListPage />,
      },
      {
        path: `/${pathAdmin}/setting/account-admin/create`,
        element: <AccountAdminCreatePage />,
      },
      {
        path: `/${pathAdmin}/setting/account-admin/edit/:id`,
        element: <AccountAdminEditPage />,
      },
      {
        path: `/${pathAdmin}/setting/role/list`,
        element: <RoleListPage />,
      },
      {
        path: `/${pathAdmin}/setting/role/create`,
        element: <RoleCreatePage />,
      },
      {
        path: `/${pathAdmin}/setting/role/edit/:id`,
        element: <RoleEditPage />,
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
