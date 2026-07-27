"use client";

import { Fragment, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ArtTable, Frame1, Frame2, Frame3, Frame4, Frame5 } from ".";
import OutsideClickTracker from "../OutSideClickTracker";
import Button from "../button";
import { PiFilePdfLight } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import { kaitiFont } from "@/fonts";


const frameNames: any = {
  "1": "超度祖先",
  "2": "超度历劫冤親菩萨",
  "3": "超度婴灵",
  "4": "年超度法会参加小蒙山信众芳名、宝号",
  "5": "年超度法会供佛供斋信众芳名、宝号",
};

export const ExportToPDF = ({
  artId,
  title,
  data,
  className,
  headersData,
  startCount,
  ...rest
}: any) => {
  const componentRef = useRef(null);
  const searchParams = useSearchParams();
  const [isPrinting, setIsPrinting] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const fileName = `${searchParams.get("year") || new Date().getFullYear()}_${
    frameNames[artId] ?? `art_${artId}`
  }.pdf`; // file name for the excel file

  const print = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @page {
      size: ${
        artId === 5
          ? "10.5in 18.5in;"
          : artId === 4
          ? "11.7in 9.5in;"
          : artId === 1
          ? "11.7in 11.5in;"
          : "11.7in 8.3in;"
      }
      margin: 0mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        font-family: ${kaitiFont.style.fontFamily};
      }
      .show-pdf{
        display:block !important;
      }
      .pdf-frame-item {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .pdf-page-break {
        break-after: page;
        page-break-after: always;
      }
    }
  `,
    documentTitle: fileName,
  });

  const handlePrint = () => {
    setIsPrinting(true);
    return print();
  };

  const Content = () => (
    <div className="bg-white w-full h-[75vh] shadow-md border sm:min-w-[600px] flex justify-center  overflow-scroll relative p-2">
      <div
        ref={componentRef}
        onClick={handlePrint}
        className={`bg-white flex parent flex-wrap justify-start mx-auto w-full flex-1 relative pt-10 ${
          artId === 5 ? "gap-x-32 gap-y-10 px-4" : "gap-x-20 gap-y-10 w-[80%] "
        }`}
      >
        <div
          className={`flex justify-center w-full items-center py-0 mb-6 ${
            showTable ? "" : "absolute top-4"
          }`}
        >
          <p className="text-4xl font-medium">
            {searchParams.get("year") || new Date().getFullYear()}{" "}
            {frameNames[artId]}
          </p>
        </div>
        {showTable ? (
          <ArtTable
            //  template1 , template2 , name1 , name2
            headersData={(artId == 3
              ? ["id", "space1", "space2", "name1", "name2"]
              : ["id", ...headersData]
            ).filter(
              (header: any) =>
                header !== "singlePrice" && header !== "packagePrice"
            )}
            data={data}
            artId={artId}
            className={showTable ? "" : "mt-28"}
          />
        ) : artId == 4 ? (
          <Frame4 data={data} className="mt-10" />
        ) : (
          data?.map(({ artId, _id, ...rest }: any, index: number) => (
            <div
              key={_id}
              className={`pdf-frame-item ${
                artId === 5 ? "w-[24%] pt-6" : "w-[18%] pt-10 px-4"
              } relative mt-4 ${
                artId === 1 &&
                (index + 1) % 4 === 0 &&
                index !== data.length - 1
                  ? "pdf-page-break"
                  : ""
              }`}
            >
              <p
                className={`text-5xl font-semibold absolute z-10 top-8 ${
                  artId === 1 ? "left-9" : artId === 5 ? "left-0" : ""
                }`}
              >
                {(startCount || 0) + index + 1}
              </p>
              {artId === 1 ? (
                <Frame1 {...rest} />
              ) : artId === 2 ? (
                <Frame2 {...rest} className={"w-[280px] min-h-[700px]"} />
              ) : artId === 3 ? (
                <Frame3 {...rest} className={"w-[280px] min-h-[700px]"} />
              ) : (
                <Frame5 {...rest} />
              )}
            </div>
          ))
        )}
        {/* {!data?.length && (
          <Fragment>
            {artId === 1 ? (
              <Frame1 {...rest} />
            ) : artId === 2 ? (
              <Frame2 {...rest} />
            ) : artId === 3 ? (
              <Frame3 {...rest} />
            ) : (
              <Frame5 {...rest} />
            )}
          </Fragment>
        )} */}
      </div>
      <div className="flex items-start justify-end py-4 sticky top-0 w-fit px-4">
        <Button
          onClick={handlePrint}
          loading={false}
          className="text-white text-base font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  rounded-lg  px-5 py-2.5 text-center me-2 mb-2 "
        >
          export to pdf
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div
        onClick={() => {
          setShowTable(false);
          setIsPrinting(true);
        }}
        role="button"
        className={`flex gap-2  justify-center ${className ?? ""}`}
      >
        {title ?? ""}
        <PiFilePdfLight size={30} />
      </div>
      {!rest.hideExportToTable && (
        <button
          className="w-[200px] h-12 p-2 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            setShowTable(true);
            setIsPrinting(true);
          }}
        >
          Export to Table
        </button>
      )}
      {isPrinting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-[9999] flex justify-center items-center printModalContainer">
          <OutsideClickTracker
            onOutsideClick={() => setIsPrinting(false)}
            className="flex justify-center px-4 w-full"
          >
            <Content />
          </OutsideClickTracker>
        </div>
      )}
    </>
  );
};
