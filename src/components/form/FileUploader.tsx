/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilePond } from "react-filepond";
import "@/libs/filepond";

export const FileUploader = ({
  id,
  label,
  files,
  setFiles,
}: {
  id: string;
  label: string;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  return (
    <>
      <div className="file-uploader sm:col-span-2">
        <label
          htmlFor={id}
          className="text-travel-label mb-1 block text-sm font-medium"
        >
          {label}
        </label>
        <FilePond
          name={id}
          allowMultiple={false} // Chỉ chọn 1 ảnh
          allowRemove={true} // Cho phép xóa ảnh
          labelIdle="+"
          acceptedFileTypes={["image/*"]}
          files={files}
          onupdatefiles={setFiles}
        />
      </div>
    </>
  );
};
