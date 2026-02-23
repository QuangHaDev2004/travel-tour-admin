import { PageTitle } from "@/components/pageTitle/PageTitle";
import { CategoryFilterBar } from "./components/CategoryFilterBar";
import { CategoryTable } from "./components/CategoryTable";
import { Pagination } from "@/components/pagination/Pagination";
// import { ButtonCreate } from "@/components/button/ButtonCreate";
import { pathAdmin } from "@/config/path";
import { useCategoryList } from "../../hooks/useCategoryList";

export const CategoryList = () => {
  const { data, isLoading } = useCategoryList();
  const categoryList = data?.categoryList ?? [];
  const pagination = data?.pagination ?? {};

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Quản lý danh mục" />
        <ButtonCreate to={`/${pathAdmin}/category/create`} />
      </div>
      <CategoryFilterBar />
      <CategoryTable categoryList={categoryList} isLoading={isLoading} />
      {categoryList.length > 0 && (
        <Pagination pagination={pagination} list={categoryList} />
      )}
    </>
  );
};
