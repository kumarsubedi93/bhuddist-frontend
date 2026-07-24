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
  params: {
    familyId: string;
  };
}

export default async function Admin({ searchParams, params }: IAdminProps) {
  const p = searchParams.p || 1;
  const { data } = await apiCall(
    `/frames?limit=1000&page=${p}&familyId=${params.familyId}`
  );
  const artsResponse = await apiCall("/arts");
  const arts = artsResponse?.data?.arts;
  // const { frames, totalPages, pageNumber } = data;

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

  const getTotal = (artId : number) => {
    const art = arts?.find?.((a: any) => a.artId === artId) || {};

    return art?.price
  };

  const grandTotal = arr?.reduce?.((total, item) => {
    const itemTotal = data?.frames?.filter(
      ({ artId }: any) => artId?.toString?.() === item?.label?.toString()
    ).length * getTotal(item.label);
    return total + (itemTotal || 0);
  }, 0);


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
          {arr?.map((item: any) => (
            <tr
              className="odd:bg-white  even:bg-gray-100  border-b"
              key={item.label}
            >
              <td className="flex p-4">{item.label}</td>
              <td>
                <div className="flex flex-col items-center justify-between p-2 md:p-8 gap w-full">
                  {data?.frames
                    .filter(
                      ({ artId }: any) =>
                        artId.toString() === item.label.toString()
                    )
                    ?.map((row: any) => (
                      <div
                        className="flex justify-between w-full gap-4"
                        key={row._id}
                      >
                        {row.name5 ? (
                          <p className="min-w-16"> {row.name5}</p>
                        ) : (
                          <>
                            <p className="min-w-16">
                              {" "}
                              {item.label === 4
                                ? "蒙山 -"
                                : item.label === 5
                                ? "= 供佛"
                                : ""}{" "}
                              {row.name1}
                            </p>
                            <p className="min-w-16"> {row.name2}</p>
                          </>
                        )}
                        <p className="min-w-16"> {row.name3}</p>
                        <p className="min-w-16"> {row.name4}</p>
                        <p className="min-w-16"> {row.space1}</p>
                        <p className="min-w-16"> {row.space2}</p>
                        <p className="min-w-16"> {row.space3}</p>
                      </div>
                    ))}
                </div>
              </td>
              <td className="relative p-4">
                <p className="absolute top-0 left-2 p-4">{getTotal(item.label)}</p>
              </td>
              <td className="relative p-4">
                <div className="absolute top-0 left-2 p-4">
                  {data?.frames?.filter(
                    ({ artId }: any) =>
                      artId.toString() === item.label.toString()
                  )?.length * getTotal(item.label)}{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="py-4">
            <td></td>
            <td></td>
            <td className="text-center text-xl font-semibold py-4"> Grand Total : </td>
            <td className="py-4">{grandTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
