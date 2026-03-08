/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilePond } from "react-filepond";
import "@/libs/filepond";

type FileUploaderProps = {
  id: string;
  label: string;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  oneCol?: boolean;
};

export const FileUploader = ({
  id,
  label,
  files,
  setFiles,
  oneCol,
}: FileUploaderProps) => {
  return (
    <>
      <div className={`file-uploader ${oneCol ? "" : "sm:col-span-2"} `}>
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
