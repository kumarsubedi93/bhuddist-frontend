import { Frame1, Frame2, Frame3, Frame4, Frame5 } from "@/components/Frames";
// import Pagination from "@/components/pagination";
import { apiCall } from "@/lib/helper";
import { Fragment } from "react";

const artTypes = [1, 2];

interface IHomeProps {
  searchParams: {
    limit: number;
    artId: string;
  };
}

export default async function Home({ searchParams }: IHomeProps) {
  const { data } = await apiCall(
    `/frames/filter?limit=${
      "200000" ??
      (searchParams.limit || ((searchParams.artId as any) == 4 ? 10 : 4))
    }&artId=${searchParams.artId || 1}`
  );
  console.log(data, "dataa");
  const frames = data?.frames?.[0]?.[`art${searchParams.artId || 1}`] || [];
  return (
    <div className="flex flex-col items-center justify-between py-2 mt-28 min-h-[750px]">
      <div className={`flex gap-4 parent flex-wrap w-[80%] ${+searchParams.artId === 5 ? 'justify-end':'justify-start'}`}>
        {+searchParams.artId == 4 ? (
          <Frame4 data={frames} />
        ) : (
          frames?.map(({ artId, _id, ...rest }: any, index: any) => (
            <div
              key={_id}
              className={`relative ${
                +searchParams.artId === 5 ? "w-[30%]" : ""
              } `}
            >
              <p
                className={`text-7xl font-semibold absolute z-10 top-6 ${
                  +searchParams.artId === 1 ? "left-9" :  +searchParams.artId === 5 ? "left-[-90px]" : ""
                }`}
              >
                {index + 1}
              </p>
              {artId === 1 ? (
                <Frame1 {...rest} />
                
              ) : artId === 2 ? (
                <Frame2 {...rest} />
              ) : artId === 3 ? (
                <Frame3 {...rest} />
              ) : (
                <Frame5 {...rest} />
              )}
            </div>
          ))
        )}
      </div>
      {/* <Pagination currentPage={+data.page || 1} totalPages={+data.totalPages || 1} className="!w-[80%]" /> */}
    </div>
  );
}
