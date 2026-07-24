"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import Button from "../button";
import { serverRedirect } from "@/lib/action";
import { usePathname, useSearchParams } from "next/navigation";

interface IPagination {
  totalPages: number;
  currentPage: number;
  className?:string;
}

export default function Pagination({ totalPages, currentPage , className }: IPagination) {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4; // Adjust as needed

    // Display logic to limit the number of visible pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const generateHref = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("p", pageNumber.toString());
      return `${pathName}?${params.toString()}`;
  };
  return (
    <div className={`w-full border-t border-gray-300 ${className}`}>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <Button
            className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage ===1 ? 'cursor-not-allowed':''}`}
            onClick={()=> serverRedirect(generateHref(currentPage - 1))}
            loading={false}
            disabled={currentPage ===1 }
          >
            &larr; Previous
          </Button>
        </div>
        <div className="flex items-center">
          {generatePageNumbers().map((pageNumber, index) => (
            <Fragment key={pageNumber}>
              {pageNumber === "..." ? (
                <p>...</p>
              ) : (
                <Link
                  href={generateHref(pageNumber)}
                  className="mx-1 flex items-center px-3 py-1 text-gray-900 hover:scale-105"
                >
                  {pageNumber}
                  {pageNumber === currentPage && (
                    <span className="sr-only">(current)</span>
                  )}
                </Link>
              )}
            </Fragment>
          ))}
        </div>
        <div>
          <Button
            className={`mx-1 text-sm font-semibold text-gray-900 ${currentPage === totalPages ? 'cursor-not-allowed':''}`}
            onClick={()=> serverRedirect(generateHref(currentPage + 1))}
            disabled={currentPage === totalPages}
            loading={false}
          >
            Next &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
