/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { renderOptions } from "@/utils/renderOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseInput } from "@/components/form/BaseInput";
import { BaseSelect } from "@/components/form/BaseSelect";
import { useCategoryList } from "@/hooks/useCategoryList";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FileUploader } from "@/components/form/FileUploader";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { ButtonBack } from "@/components/button/ActionButtons";
import { useCreateCategory } from "../hooks/useCreateCategory";
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Tạo danh mục" />
        <ButtonBack />
      </div>
      <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
        <form
          onSubmit={handleSubmit(handleCategoryForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <BaseInput
            id="name"
            label="Tên danh mục"
            register={register("name")}
            error={errors.name}
            isRequired
          />

          <BaseSelect
            id="parent"
            label="Danh mục cha"
            register={register("parent")}
            error={errors.parent}
          >
            <option value="">-- Chọn danh mục --</option>
            {renderOptions(categoryTree)}
          </BaseSelect>

          <BaseInput
            id="position"
            label="Vị trí"
            type="number"
            register={register("position")}
            error={errors.position}
            placeholder="Note: Tự động tăng"
          />

          <BaseSelect
            id="status"
            label="Trạng thái"
            register={register("status")}
            error={errors.status}
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm dừng</option>
          </BaseSelect>

          <FileUploader
            id="avatar"
            label="Ảnh đại diện"
            files={avatars}
            setFiles={setAvatars}
          />

          <div className="col-span-1 flex flex-col gap-1 md:col-span-2">
            <label className="text-travel-label block text-sm font-medium">
              Mô tả
            </label>

            <EditorMCE id="description" value="" editorRef={editorRef} />
          </div>

          <ButtonSubmit isPending={isPending} text="Tạo mới" />
        </form>
      </div>
    </>
  );
};
