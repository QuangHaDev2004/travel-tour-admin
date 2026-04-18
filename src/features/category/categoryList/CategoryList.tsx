import { pathAdmin } from "@/config/path";
import { CategoryListTable } from "./CategoryListTable";
import { useCategoryList } from "@/hooks/useCategoryList";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { useCategoryDelete } from "../hooks/useCategoryDelete";
import { ButtonCreate } from "@/components/button/ActionButtons";
import { NoPermission } from "@/components/common/NoPermission";
import { useAuthStore } from "@/stores/useAuthStore";

export const CategoryList = () => {
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const { data, isLoading } = useCategoryList();
  const categoryList = data?.categoryList ?? [];
  const pagination = data?.pagination ?? {};

  const { mutate: categoryDelete, isPending: isPendingCategoryDelete } =
    useCategoryDelete();

  return (
    <>
      {permissions?.includes("category-view") ? (
        <>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Quản lý danh mục" />
            <ButtonCreate to={`/${pathAdmin}/category/create`} />
          </div>

          <CategoryListTable
            data={categoryList}
            isLoading={isLoading}
            pagination={pagination}
            categoryDelete={categoryDelete}
            isPendingCategoryDelete={isPendingCategoryDelete}
          />
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
