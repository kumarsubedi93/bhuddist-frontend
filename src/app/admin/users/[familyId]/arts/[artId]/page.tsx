import EditFrame from "@/components/EditFrame";
import Tabs from "@/components/Tabs";
import { InputFields } from "@/components/createFrames/helper";
import DataTable from "@/components/dataTable/page";
import { apiCall, getAllFormValues } from "@/lib/helper";
import { Tab } from "@/lib/types";
import Link from "next/link";

interface IAdminProps {
  searchParams: {
    edit: string;
    p: string;
    l: string;
    year:string;
  };
  params: {
    artId: string;
    familyId: string;
  };
}

export default async function Admin({ searchParams, params }: IAdminProps) {
  const { p = 1, l = 10, year } = searchParams;
  let limit = +l + 200000;
  let url = `/frames?limit=${limit}&page=${p}&artId=${params.artId}&familyId=${params.familyId}`
  if(year){
    url +=`&year=${year}`
  }
  const { data } = await apiCall(url);
  const { totalPages, page } = data;

  let frameDetails;
  if (searchParams.edit) {
    const { data } = await apiCall(`/frames/${searchParams.edit}`);
    if (data.frame) {
      frameDetails = getAllFormValues(data.frame);
    }
  }
  const formTabs: Tab[] = Array.from({ length: 5 }, (_, i) => ({
    name: `Form${i + 1}`,
    href: `/admin/users/${params.familyId}/arts/${i + 1}`,
    isActive: false,
  }));

  console.log(data.startCount ,"dataaa")

  return (
    <div className="flex flex-col min-h-screen  px-2 gap-4">
      <div className="flex justify-between items-center">
        <Tabs
          tabs={formTabs}
          currentTab={`/admin/users/${params.familyId}/arts/${params.artId}`}
        />

        <Link
          className="text-white text-base font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  rounded-lg  px-5 py-2 text-center me-2 mb-2 border-transparent !m-0 "
          href={`${params.artId}/create`}
        >
          Create Art 
        </Link>
      </div>
      {searchParams.edit && frameDetails && (
        <EditFrame
          artId={params.artId}
          frameDetails={frameDetails}
          familyId={params.familyId}
        />
      )}
      <DataTable
        headerData={InputFields.filter(({ includedInArts }) =>
            includedInArts?.includes(+params.artId || 1)
        )}
          rowsData={data?.frames}
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
          artId={+params.artId || 1}
          startCount={data?.startCount}
          // className="!h-[60vh] overflow-scroll"
        />
        <div className="flex justify-end px-4">
          <p className="text-xl font-semibold">
            Total Price : <span>{data?.totalPrice}</span>
          </p>
        </div>
    </div>
  );
}
