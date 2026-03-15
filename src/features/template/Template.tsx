import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { templateSchema, type TemplateInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { useCategoryList } from "../../hooks/useCategoryList";
import { renderOptions } from "@/utils/renderOptions";
import { useTemplateEdit } from "./hook/useTemplateEdit";
import { useTemplateDetail } from "./hook/useTemplateDetail";
import { useEffect, useMemo } from "react";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { BaseSelect } from "@/components/form/BaseSelect";

export const Template = () => {
  const { data } = useCategoryList();
  const categoryTree = useMemo(
    () => data?.categoryTree ?? [],
    [data?.categoryTree],
  );
  const { templateDetail } = useTemplateDetail();
  const { mutate: mutateTemplateEdit, isPending: pendingTemplateEdit } =
    useTemplateEdit();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateInputs>({
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Thiết lập giao diện" />
      </div>
      <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
        <form
          onSubmit={handleSubmit(handleTemplateForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <BaseSelect
            id="dataTourListOne"
            label="Dữ liệu Home Tour List One"
            register={register("dataTourListOne")}
            error={errors.dataTourListOne}
          >
            <option value="">-- Chọn danh mục --</option>
            {renderOptions(categoryTree)}
          </BaseSelect>

          <BaseSelect
            id="dataTourListTwo"
            label="Dữ liệu Home Tour List Two"
            register={register("dataTourListTwo")}
            error={errors.dataTourListTwo}
          >
            <option value="">-- Chọn danh mục --</option>
            {renderOptions(categoryTree)}
          </BaseSelect>

          <ButtonSubmit text="Cập nhật" isPending={pendingTemplateEdit} />
        </form>
      </div>
    </>
  );
};
