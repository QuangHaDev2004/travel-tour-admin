/* eslint-disable @typescript-eslint/no-explicit-any */
import { pathAdmin } from "@/config/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { renderOptions } from "@/utils/renderOptions";
import { useNavigate, useParams } from "react-router";
import { BaseInput } from "@/components/form/BaseInput";
import { BaseSelect } from "@/components/form/BaseSelect";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { useCategoryList } from "@/hooks/useCategoryList";
import { useCategoryEdit } from "../hooks/useCategoryEdit";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { FileUploader } from "@/components/form/FileUploader";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { useCategoryDetail } from "../hooks/useCategoryDetail";
import { ButtonBack } from "@/components/button/ActionButtons";
import { categoryFormSchema, type CategoryFormInputs } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";
import { NoPermission } from "@/components/common/NoPermission";

export const CategoryEdit = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

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
      {permissions?.includes("category-edit") ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Chỉnh sửa danh mục" />
            <ButtonBack />
          </div>
          {categoryDetail && categoryTree && (
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

                  <EditorMCE
                    id="description"
                    value={categoryDetail.description}
                    editorRef={editorRef}
                  />
                </div>

                <ButtonSubmit isPending={isPending} text="Cập nhật" />
              </form>
            </div>
          )}
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
