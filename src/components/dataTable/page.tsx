import Link from "next/link";
import React, { Fragment, ReactNode } from "react";
import Pagination from "../pagination";
import dynamic from "next/dynamic";
import { ExportToPDF } from "../Frames/ExportPDF";
import ExportToExcel from "../Frames/ExportToExcel";
import ConfirmDeleteModal from "../confirmDeleteModal";
import ListDropdown from "../ListDropdown";
import { getYears } from "@/lib/helper";
import YearDropdown from "./yearDropdown";

interface IDataTable {
  headerData: {
    label: string;
    name: string;
  }[];
  rowsData: Array<any>;
  totalPages: number | string;
  currentPage: number | string;
  searchParams: any;
  artId: number;
  showHeader?: boolean;
  showAction?: boolean;
  className?:string
  startCount?:number
}

const NotFound = dynamic(() => import("./NoDataFound"));

const DataTable = ({
  headerData,
  rowsData,
  currentPage,
  totalPages,
  searchParams,
  artId,
  showHeader = true,
  showAction = true,
  className,
  startCount
}: IDataTable) => {
  const allKeys = headerData.map(({ name }) => name);
  return (
    <Fragment>
      {/* {showHeader && ( */}
        <div className="justify-end flex p-2">
          <YearDropdown />
          {showHeader && 
          <ExportToExcel
            headersData={[
              "id",
              ...allKeys.filter((key) => key !== "space3" && key != "name5"),
            ]}
            rowsData={rowsData?.map((row, index) => ({
              ...row,
              编号: index + 1,
            }))}
            artId={artId}
            startCount={startCount}
          />
          }
        </div>
      {/* )} */}
      <div className={`relative overflow-x-auto border shadow-md w-full sm:rounded-lg min-h-[68vh] flex flex-col justify-between ${className}`}>
        <table className="w-full text-base text-left rtl:text-right text-gray-500 py-4">
          {showHeader && <thead className="text-base text-gray-700 uppercase bg-gray-100 border-b">
            <tr>
              {(showAction
                ? [...headerData, { label: "Action" }]
                : [...headerData]
              ).map(({ label }) => (
                <Fragment key={label}>
                  <th scope="col" className="px-6 py-3">
                    {label}
                  </th>
                </Fragment>
              ))}
            </tr>
          </thead>}
          <tbody>
            {rowsData?.map((row) => (
              <tr
                className="odd:bg-white  even:bg-gray-100  border-b"
                key={row._id}
              >
                {allKeys.map((key) => (
                  <td className="px-6 py-4" key={key}>
                    {row[key]}
                  </td>
                ))}
                {showAction && (
                  <td className="px-6 py-4 flex gap-4">
                    <Link
                      href={`?p=${searchParams.p || 1}&l=${
                        searchParams.l || 10
                      }&edit=${row._id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </Link>
                    <ConfirmDeleteModal
                      title="Confirm Delete"
                      message="Are you sure you want to delete this item?"
                      id={row._id}
                      // onConfirm={handleDelete}
                      // onCancel={handleCancel}
                      // isOpen={isModalOpen}
                    />

                    {/* <ExportToPDF artId={artId} {...row} /> */}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!rowsData?.length && <NotFound />}
        {/* <Pagination
          currentPage={+currentPage || 1}
          totalPages={+totalPages || 1}
        /> */}
      </div>
    </Fragment>
  );
};

export default DataTable;
