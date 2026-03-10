import { Outlet } from "react-router";

export const AccountLayout = () => {
  return (
    <div className="min-h-screen bg-[url(/assets/images/bg-account.jpg)] bg-cover bg-center bg-no-repeat py-8">
      <div className="border-travel-four mx-auto w-[95%] rounded-2xl border bg-white p-6 sm:w-130">
        <Outlet />
      </div>
    </div>
  );
};
