/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema, type CategoryFormInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { FormInput } from "@/components/form/FormInput";
import { ButtonSubmit } from "@/components/button/ButtonSubmit";
import { ContextLink } from "@/components/common/ContextLink";
import { pathAdmin } from "@/config/path";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCategoryList } from "../../hooks/useCategoryList";
import { renderOptions } from "@/utils/renderOptions";
import { useNavigate, useParams } from "react-router";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { useCategoryDetail } from "./hooks/useCategoryDetail";
import { useCategoryEdit } from "./hooks/useCategoryEdit";
import { FileUploader } from "@/components/form/FileUploader";
import { SelectField } from "@/components/form/SelectField";

export const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  const [avatars, setAvatars] = useState<any[]>([]);
  const { data } = useCategoryList();
  const categoryTree = useMemo(
    () => data?.categoryTree ?? [],
    [data?.categoryTree],
  );
  const { categoryDetail, isError } = useCategoryDetail(id);
  const { mutate, isPending } = useCategoryEdit(id);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: zodResolver(categoryFormSchema) as any,
  });

  useEffect(() => {
    if (categoryDetail && categoryTree.length > 0) {
      reset({
        name: categoryDetail.name,
        parent: categoryDetail.parent,
        position: categoryDetail.position,
        status: categoryDetail.status,
      });
    }

    if (categoryDetail && categoryDetail.avatar) {
      setAvatars([{ source: categoryDetail.avatar }]);
    }
  }, [categoryDetail, categoryTree, reset]);

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

  if (isError) navigate(`/${pathAdmin}/category/list`);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Chỉnh sửa danh mục" />
        <ContextLink
          text="Quay lại danh sách"
          to={`/${pathAdmin}/category/list`}
        />
      </div>
      {categoryDetail && categoryTree && (
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
                className="text-travel-gray-800 mb-1 block text-sm font-medium"
              >
                Mô tả
              </label>
              <EditorMCE
                editorRef={editorRef}
                value={categoryDetail.description}
                id="description"
              />
            </div>

            <ButtonSubmit isPending={isPending} text="Cập nhật" />
          </form>
        </div>
      )}
    </>
  );
};
