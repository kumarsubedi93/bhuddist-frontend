import EditFrame from "@/components/EditFrame";
import Tabs from "@/components/Tabs";
import { InputFields } from "@/components/createFrames/helper";
import DataTable from "@/components/dataTable/page";
import { apiCall, getAllFormValues } from "@/lib/helper";
import { Tab } from "@/lib/types";

interface IAdminProps {
  searchParams: {
    edit: string;
    p: string;
    l: string;
  };
  params: {
    artId: string;
    userId:string
  };
}

export default async function Admin({ searchParams, params }: IAdminProps) {
  const { p = 1, l = 10 } = searchParams;
  let limit = +l + 200000;
  const { data } = await apiCall(
    `/frames?limit=${limit}&page=${p}&artId=${params.artId}`
  );
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
    href: `/admin/art/${i + 1}/user/${params.userId}`,
    isActive: false,
  }));

  return (
    <div className="flex flex-col min-h-screen  px-2 gap-4">
      <Tabs tabs={formTabs} currentTab={ `/admin/art/${params.artId || 1}/user/${params.userId}`} />
      {searchParams.edit && frameDetails && (
        <EditFrame artId={params.artId} frameDetails={frameDetails} />
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
      />
    </div>
  );
}
