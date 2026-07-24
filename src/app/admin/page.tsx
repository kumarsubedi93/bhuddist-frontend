import EditFrame from "@/components/EditFrame";
import Table from "@/components/Table";
import CreateFrames from "@/components/createFrames";
import { InputFields } from "@/components/createFrames/helper";
import DataTable from "@/components/dataTable/page";
import { apiCall, getAllFormValues } from "@/lib/helper";

interface IAdminProps {
  searchParams: {
    edit: string;
    p: string;
  };
}

export default async function Admin({ searchParams }: IAdminProps) {
  const p = searchParams.p || 1;
  const { data } = await apiCall(`/frames?limit=100&page=${p}`);
  const { frames, totalPages, pageNumber } = data;

  let frameDetails;
  if (searchParams.edit) {
    const { data } = await apiCall(`/frames/${searchParams.edit}`);

    if (data.frame) {
      frameDetails = getAllFormValues(data.frame);
    }
  }

  const arr = [
    {
      label: 1,
      total: 40,
    },
    {
      label: 2,
      total: 40,
    },
    {
      label: 3,
      total: 40,
    },
    {
      label: 4,
      total: 40,
    },
    {
      label: 5,
      total: 40,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-8 gap-4">
      {searchParams.edit && frameDetails && (
        <EditFrame frameDetails={frameDetails} />
      )}
      {/* <Table columns={columns} data={dataa} / */}
      <table className="w-full text-base text-left rtl:text-right text-gray-500 py-4">
        <thead className="text-base text-gray-700 uppercase border-b text-center sticky top-0 z-10 bg-white shadow-sm">
          <tr>
            <th scope="col" className="px-6 py-3">
              S No
            </th>
            <th scope="col" className="px-6 py-3">
              Arts
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Grand Total
            </th>
          </tr>
        </thead>
        <tbody>
          {arr?.map((row) => (
            <tr
              className="odd:bg-white  even:bg-gray-100  border-b"
              key={row.label}
            >
              <td className="flex p-4">{row.label}</td>
              <td>
                <DataTable
                  headerData={InputFields.filter(
                    ({ includedInArts, name }) =>
                      includedInArts?.includes(+row.label || 1) &&
                      name != "singlePrice" &&
                      name != "packagePrice"
                  )}
                  rowsData={data?.frames?.filter(
                    ({ artId }: any) =>
                      artId.toString() === row.label.toString()
                  )}
                  currentPage={1}
                  totalPages={10}
                  searchParams={{}}
                  artId={+row.label}
                  showHeader={false}
                  showAction={false}
                  className="!h-fit min-h-[auto] py-4"
                />
              </td>
              <td className="relative p-4">
                <p className="absolute top-0 left-2 p-4">{row.total}</p>
              </td>
              <td className="relative p-4">
                <div className="absolute top-0 left-2 p-4">
                  {data?.frames?.filter(
                    ({ artId }: any) =>
                      artId.toString() === row.label.toString()
                  )?.length * row.total}{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <DataTable
        headerData={InputFields}
        rowsData={frames || []}
        totalPages={totalPages}
        currentPage={pageNumber}
        searchParams={{}}
        artId={1}
      /> */}
    </div>
  );
}
