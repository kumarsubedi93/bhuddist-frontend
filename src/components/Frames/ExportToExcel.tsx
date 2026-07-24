"use client";
import React, { useState } from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { mkConfig, generateCsv, download } from "export-to-csv";

import { ExportToPDF } from "./ExportPDF";
import { capitalizeArrayFirstLetters, frameNames } from "@/lib/helper";

type Props = {
  headersData: string[];
  rowsData: any[];
  artId: number;
  hideExportWithPrice?: boolean;
  hideExportToTable?: boolean;
  startCount?: number;
};

const ExportToExcel = ({
  headersData,
  rowsData,
  artId,
  hideExportWithPrice = true,
  hideExportToTable = true,
  startCount = 0,
}: Props) => {
  const [includePrice, setIncludePrice] = useState("true");
  const [isPrinting, setIsPrinting] = useState(false);

  const [isShowTableToPrint, setIsShowTableToPrint] = useState(false);

  const convertToObjects = (header: any[], body: any[]) => {
    return body.map((row) => {
      let obj: any = {};
      header.forEach((key, index) => {
        obj[key] = row[index] ?? ""; // Assign row values to corresponding header keys
      });
      return obj;
    });
  };

  const generateBody = (header: string[], rows: any[]) => {
    return rows.map((row, index) => {
      return ["id", ...header].map((key) =>
        key === "id"
          ? index + 1
          : artId == 3 && key === "space2"
          ? `${row.space2 ?? ""} 氏腹中 ${row.space3 ?? ""}位童灵`
          : artId == 3 && key === "space1"
          ? `落孕夭枉水子 ${row.space1 ?? ""} 位婴灵`
          : row[key]
      );
    });
  };


  const handleExportExcel = () => {
    const header =
      includePrice === "true"
        ? headersData
        : headersData.filter(
            (header) => header !== "singlePrice" && header !== "packagePrice"
          );

    const fileName = `${new Date().getFullYear()}${
      includePrice === "true" ? "export_with_price" : "export_without_price"
    }_${frameNames[artId] ?? `art_${artId}`}`; // file name for the excel file

    const csvConfig = mkConfig({ useKeysAsHeaders: true , filename:fileName});

    const inputData = {
      header: capitalizeArrayFirstLetters(
        artId == 3
          ? [
              "id",
              "space1",
              "space2",
              "name1",
              "name2",
              "singlePrice",
              "packagePrice",
            ]
          : ["id", ...header],
        artId
      ),
      body: generateBody(header, rowsData),
    };

    const csvFormattedData = convertToObjects(inputData.header, inputData.body);

    const csv = generateCsv(csvConfig)(csvFormattedData);


    download(csvConfig)(csv);

    // downloadExcel({
    //   fileName,
    //   sheet: "react-export-table-to-excel",
    //   tablePayload: {
    //     header: capitalizeArrayFirstLetters(
    //       artId == 3
    //         ? [
    //             "id",
    //             "space1",
    //             "space2",
    //             "name1",
    //             "name2",
    //             "singlePrice",
    //             "packagePrice",
    //           ]
    //         :[ 'id',...header],
    //       artId
    //     ),
    //     body: generateBody(header, rowsData),
    //   },
    // });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex  gap-4">
      {/* <label className="mb-2 text-sm font-medium text-gray-700 flex items-center whitespace-nowrap gap-4">
        <select
          className="block w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setIncludePrice(e.target.value)}
          value={includePrice}
        >
          <option value="" disabled>
            Select export option
          </option>

          <option value="true">With Price</option>
          <option value="false">Without Price</option>
        </select>
      </label> */}
      {/* <div className="flex mt-3 space-x-2"> */}

      {!hideExportWithPrice && (
        <button
          className="w-[200px] h-12 p-2 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleExportExcel}
        >
          Export with Price
        </button>
      )}
      {/* <button
        className="w-[200px] h-12 p-2 text-base font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        //   onClick={handleExportPDF}
      > */}
      <ExportToPDF
        title="Export to PDF"
        headersData={headersData}
        data={rowsData}
        artId={artId}
        className="w-[200px] h-12 p-2 text-base font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        showTable={isShowTableToPrint}
        hideExportToTable={hideExportToTable}
        startCount={startCount}
      />
    </div>
  );
};

export default ExportToExcel;
