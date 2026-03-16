// import { Badge } from "@/components/badge/Badge";
import { ButtonDelete } from "@/components/button/ButtonDelete";
import { ButtonEdit } from "@/components/button/ButtonEdit";
// import { CustomCheckbox } from "@/components/checkbox/Checkbox";
import { pathAdmin } from "@/config/path";

export const UserTable = () => {
  return (
    <div className="srcoll-table mb-[15px] overflow-hidden overflow-x-auto rounded-[14px] border border-[#D5D5D5] bg-white">
      <table className="text-secondary w-full min-w-[1141px] border-collapse">
        <thead>
          <tr>
            <th className="border-b border-[#D5D5D5] py-[15px] pl-[32px]">
              {/* <CustomCheckbox /> */}
            </th>
            <th className="border-b border-[#D5D5D5] p-[15px] text-left text-sm font-extrabold">
              Họ tên
            </th>
            <th className="border-b border-[#D5D5D5] p-[15px] text-center text-sm font-extrabold">
              Ảnh đại diện
            </th>
            <th className="border-b border-[#D5D5D5] p-[15px] text-left text-sm font-extrabold">
              Email
            </th>
            <th className="border-b border-[#D5D5D5] p-[15px] text-left text-sm font-extrabold">
              Số điện thoại
            </th>
            <th className="border-b border-[#D5D5D5] p-[15px] text-left text-sm font-extrabold">
              Địa chỉ
            </th>
            <th className="border-b border-[#D5D5D5] p-[15px] text-left text-sm font-extrabold">
              Trạng thái
            </th>
            <th className="border-b border-[#D5D5D5] p-[15px] text-left text-sm font-extrabold">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-[#D5D5D5] py-[8px] pl-[32px]">
              {/* <CustomCheckbox /> */}
            </td>
            <td className="border-b border-[#D5D5D5] px-[15px] py-[8px] text-left text-sm font-semibold">
              Lê Văn A
            </td>
            <td className="border-b border-[#D5D5D5] px-[15px] py-[8px] text-center text-sm font-semibold">
              <img
                src="/assets/images/ha-long.jpg"
                className="mx-auto h-[60px] w-[60px] rounded-md object-cover"
              />
            </td>
            <td className="border-b border-[#D5D5D5] px-[15px] py-[8px] text-left text-sm font-semibold">
              <div>levana@gmail.com</div>
            </td>
            <td className="border-b border-[#D5D5D5] px-[15px] py-[8px] text-left text-sm font-semibold">
              <div>01234567890</div>
            </td>
            <td className="border-b border-[#D5D5D5] px-[15px] py-[8px] text-left text-sm font-semibold">
              Số 123, đường ABC,...
            </td>
            <td className="border-b border-[#D5D5D5] px-[15px] py-[8px] text-left text-sm font-semibold">
              {/* <Badge
                className="inline-block rounded-[4.5px] bg-[rgba(0,182,155,0.2)] px-[16px] py-[6px] text-xs font-bold text-[#00B69B]"
                content="Hoạt động"
              /> */}
            </td>
            <td className="border-b border-[#D5D5D5] px-[15px] py-[8px] text-left text-sm font-semibold">
              <div className="inline-flex items-center rounded-lg border border-[#D5D5D5] bg-[#FAFBFD]">
                <ButtonEdit to={`/${pathAdmin}/user/edit`} />
                <ButtonDelete endpoint={`/${pathAdmin}/user/delete`} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
