"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface GearPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function GearPagination({
  currentPage,
  totalPages,
}: GearPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper utility to update URL parameters reactively without breaking filters
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page < 1 || page > totalPages) return;
    router.push(createPageUrl(page));
  };

  // Generate numbered list blocks dynamically with smart truncation thresholds
  const renderPageNumbers = () => {
    const items = [];
    const maxVisible = 3; // Controls central button volume count boundaries

    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Always render Page 1 first
    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href={createPageUrl(1)}
            onClick={(e) => handlePageChange(e, 1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    // Render bounded middle sequence
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={createPageUrl(i)}
            onClick={(e) => handlePageChange(e, i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Always render Last Page index safely
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href={createPageUrl(totalPages)}
            onClick={(e) => handlePageChange(e, totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* Previous Button control */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
            onClick={(e) => handlePageChange(e, currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Dynamic Inner Numeric Ranges Grid */}
        {renderPageNumbers()}

        {/* Next Button control */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"
            }
            onClick={(e) => handlePageChange(e, currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
