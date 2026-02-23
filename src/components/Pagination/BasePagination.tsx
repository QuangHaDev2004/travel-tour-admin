/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export const BasePagination = ({
  pagination,
  list,
}: {
  pagination: {
    skip: number;
    totalRecord: number;
    totalPage: number;
  };
  list: any;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const handlePageChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 1) {
      params.set("page", value.toString());
    } else {
      params.delete("page");
    }

    setSearchParams(params);
  };

  const renderPages = () => {
    const pages = [];
    const { totalPage } = pagination;

    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 || // Luôn hiện trang đầu
        i === totalPage || // Luôn hiện trang cuối
        (i >= currentPage - 1 && i <= currentPage + 1) // Hiện trang hiện tại và 2 trang sát sườn
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => handlePageChange(i)}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }
    return pages;
  };

  return (
    <div className="mt-auto flex items-center justify-between gap-5 px-2">
      <div className="text-travel-secondary/60 text-sm font-medium">
        Hiển thị {pagination.skip + 1} - {pagination.skip + list.length} của{" "}
        {pagination.totalRecord}
      </div>

      <Pagination className="m-0 flex w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < pagination.totalPage)
                  handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === pagination.totalPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
