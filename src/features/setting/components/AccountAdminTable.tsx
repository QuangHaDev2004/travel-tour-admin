import { pathAdmin } from "@/config/path";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
import { EmptyTableRow } from "@/components/table/EmptyTableRow";
import { Search } from "@/components/common/Search";
import { useAccountAdminList } from "@/hooks/useAccountAdminList";
import { statusList } from "@/constants/status";

export const AccountAdminTable = () => {
  const { data, isLoading } = useAccountAdminList();
  const accountAdminList = data?.accountAdminList ?? [];

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="border-travel-secondary/20 text-travel-secondary flex h-10 items-center overflow-hidden rounded-4xl border bg-white text-sm font-semibold shadow-md">
          <select
            // value={action}
            // onChange={(event) => setAction(event.target.value)}
            className="select h-full w-[160px] border-none px-4"
          >
            <option value="">Chọn hành động</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm dừng</option>
            <option value="delete">Xóa</option>
          </select>
          {/* <button
            disabled={isDisabled}
            onClick={handleChangeMulti}
            className={`border-travel-secondary/20 h-full border-l px-4 ${isDisabled ? "text-travel-secondary/80 cursor-not-allowed" : "text-travel-red cursor-pointer"}`}
          >
            Áp dụng
          </button> */}
        </div>
        <Search placeholder="Nhập email..." />
      </div>

      <div className="srcoll-table border-travel-four mb-[15px] overflow-hidden overflow-x-auto rounded-[14px] border bg-white shadow-md">
        <table className="text-travel-secondary w-full min-w-[1141px] border-collapse">
          <thead>
            <tr>
              <th className="border-travel-four border-b p-4 text-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary border"
                  // checked={
                  //   categoryList.length > 0 &&
                  //   selectedIds.length === categoryList.length
                  // }
                  // onChange={(event) => handleCheckAll(event)}
                />
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Họ tên
              </th>
              <th className="border-travel-four border-b p-4 text-center text-sm font-extrabold">
                Ảnh đại diện
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Email
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Số điện thoại
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Nhóm quyền
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Chức vụ
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Trạng thái
              </th>
              <th className="border-travel-four border-b p-4 text-left text-sm font-extrabold">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {accountAdminList.length > 0 ? (
              accountAdminList.map((item) => {
                const status = statusList.find(
                  (st) => st.value === item.status,
                );

                return (
                  <tr key={item.id} className="last:[&>td]:border-0">
                    <td className="border-travel-four border-b px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary border"
                        value={item.id}
                        // checked={selectedIds.includes(item.id)}
                        // onChange={(event) => handleCheckItem(item.id, event)}
                      />
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                      {item.fullName}
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-center text-sm font-semibold">
                      <img
                        src={
                          item.avatar ||
                          "https://placehold.co/60x60/white/black?text=No+Image"
                        }
                        className="border-travel-four mx-auto h-[60px] w-[60px] overflow-hidden rounded-md border object-cover"
                      />
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                      {item.email}
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                      {item.phone || "Chưa có"}
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                      {item.roleName || "Chưa có"}
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                      {item.positionCompany || "Chưa có"}
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                      <div
                        className="flex h-[27px] w-[93px] items-center justify-center rounded-[4.5px] text-xs font-bold"
                        style={{
                          color: status?.color,
                          backgroundColor: status?.colorBg,
                        }}
                      >
                        {status?.label}
                      </div>
                    </td>
                    <td className="border-travel-four border-b px-4 py-2 text-left text-sm font-semibold">
                      <div className="border-travel-four inline-flex items-center rounded-lg border bg-[#FAFBFD]">
                        <ButtonEdit
                          to={`/${pathAdmin}/setting/account-admin/edit/${item.id}`}
                        />
                        <ButtonDelete
                          endpoint={`/${pathAdmin}/setting/account-admin/delete`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <EmptyTableRow colSpan={8} />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
