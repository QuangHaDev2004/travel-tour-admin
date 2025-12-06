import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { templateSchema, type TemplateInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { ButtonSubmit } from "@/components/button/ButtonSubmit";
import { useCategoryList } from "../category/hooks/useCategoryList";
import { renderOptions } from "@/utils/renderOptions";
import { useTemplateEdit } from "./hook/useTemplateEdit";
import { useTemplateDetail } from "./hook/useTemplateDetail";
import { useEffect, useMemo } from "react";

export const Template = () => {
  const { data } = useCategoryList();
  const categoryTree = useMemo(
    () => data?.categoryTree ?? [],
    [data?.categoryTree],
  );
  const { templateDetail } = useTemplateDetail();
  const { mutate: mutateTemplateEdit, isPending: pendingTemplateEdit } =
    useTemplateEdit();

  const { register, reset, handleSubmit } = useForm<TemplateInputs>({
    resolver: zodResolver(templateSchema),
  });

  useEffect(() => {
    if (templateDetail && categoryTree) {
      reset({
        ...templateDetail,
      });
    }
  }, [categoryTree, reset, templateDetail]);

  const handleTemplateForm: SubmitHandler<TemplateInputs> = (data) => {
    const dataFinal = { ...data };

    mutateTemplateEdit(dataFinal);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Thiết lập giao diện" />
      </div>
      <div className="border-travel-secondary/20 overflow-hidden rounded-md border bg-white p-6 shadow-md">
        <form
          onSubmit={handleSubmit(handleTemplateForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div>
            <label
              htmlFor="dataTourListOne"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Dữ liệu Home Tour List One
            </label>
            <select
              {...register("dataTourListOne")}
              className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
            >
              <option value="">-- Chọn danh mục --</option>
              {renderOptions(categoryTree)}
            </select>
          </div>

          <div>
            <label
              htmlFor="dataTourListTwo"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Dữ liệu Home Tour List Two
            </label>
            <select
              {...register("dataTourListTwo")}
              className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
            >
              <option value="">-- Chọn danh mục --</option>
              {renderOptions(categoryTree)}
            </select>
          </div>

          <ButtonSubmit text="Cập nhật" isPending={pendingTemplateEdit} />
        </form>
      </div>
    </>
  );
};
