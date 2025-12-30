/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { pathAdmin } from "@/config/path";
import { renderOptions } from "@/utils/renderOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { useCategoryList } from "../../hooks/useCategoryList";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { SelectField } from "@/components/form/SelectField";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ContextLink } from "@/components/common/ContextLink";
import { FileUploader } from "@/components/form/FileUploader";
import { useCreateCategory } from "./hooks/useCreateCategory";
import { ButtonSubmit } from "@/components/button/ButtonSubmit";
import { categoryFormSchema, type CategoryFormInputs } from "@/types";

export const CategoryCreate = () => {
  const editorRef = useRef<any>(null);
  const [avatars, setAvatars] = useState<any[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: zodResolver(categoryFormSchema) as any,
  });

  const { data } = useCategoryList();
  const categoryTree = data?.categoryTree ?? [];

  const { mutate, isPending } = useCreateCategory({ reset });

  const handleCategoryForm: SubmitHandler<CategoryFormInputs> = (data) => {
    data.avatar = null;
    if (avatars.length > 0 && avatars[0].file instanceof File) {
      data.avatar = avatars[0].file;
    }

    data.description = "";
    if (editorRef.current) {
      data.description = editorRef.current.getContent();
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("parent", data.parent || "");
    formData.append("position", String(data.position || ""));
    formData.append("status", data.status || "");
    formData.append("avatar", data.avatar);
    formData.append("description", data.description || "");

    mutate(formData);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Tạo danh mục" />
        <ContextLink
          text="Quay lại danh sách"
          to={`/${pathAdmin}/category/list`}
        />
      </div>
      <div className="border-travel-secondary/20 overflow-hidden rounded-md border bg-white p-6">
        <form
          onSubmit={handleSubmit(handleCategoryForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <FormInput
            id="name"
            label="Tên danh mục"
            register={register("name")}
            error={errors.name}
            isRequired
          />

          <SelectField
            name="parent"
            label="Danh mục cha"
            register={register("parent")}
          >
            <option value="">-- Chọn danh mục --</option>
            {renderOptions(categoryTree)}
          </SelectField>

          <FormInput
            id="position"
            label="Vị trí"
            type="number"
            register={register("position")}
            error={errors.position}
            placeholder="Note: Tự động tăng"
          />

          <SelectField
            name="status"
            label="Trạng thái"
            register={register("status")}
            options={[
              { label: "Hoạt động", value: "active" },
              { label: "Tạm dừng", value: "inactive" },
            ]}
          />

          <FileUploader
            id="avatar"
            label="Ảnh đại diện"
            files={avatars}
            setFiles={setAvatars}
          />

          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="description"
              className="text-travel-label mb-1 block text-sm font-medium"
            >
              Mô tả
            </label>
            <EditorMCE editorRef={editorRef} value="" id="description" />
          </div>

          <ButtonSubmit isPending={isPending} text="Tạo mới" />
        </form>
      </div>
    </>
  );
};
