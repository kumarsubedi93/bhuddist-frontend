import ExportToExcel from "@/components/Frames/ExportToExcel";
import { InputFields } from "@/components/createFrames/helper";
import YearDropdown from "@/components/dataTable/yearDropdown";
import React from "react";
import RotatePDF from "./rotatePdf";

const frameTypes = [1, 2, 3, 4, 5];

const Reports = ({ frames }: any) => {
  console.log(frames ,"Frames")
  return (
    <div className="px-6 py-4 flex flex-col gap-8">
      <div className="flex gap-4">
      <h1 className="text-xl font-bold my-4">Reports</h1>
      <YearDropdown />
      </div>
      <div className="flex flex-col gap-4">
        {frameTypes.map((frameType) => (
          <div key={frameType} className="flex gap-8 items-center">
            <p className="text-base font-semibold">Form {frameType} :</p>{" "}
            <ExportToExcel
              headersData={InputFields.filter(({ includedInArts }) =>
                includedInArts?.includes(Number(frameType))
              ).map(({ name }) => name).filter((key) => key !== "space3" && key != "name5")}
              rowsData={frames[frameType]}
              artId={Number(frameType)}
              hideExportWithPrice={false}
              hideExportToTable={false}
            />
          </div>
        ))}
      </div>
      <RotatePDF />
    </div>
  );
};

export default Reports;
