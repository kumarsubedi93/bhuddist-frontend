import CreateFrames from "@/components/createFrames";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

interface IAdminProps {
  searchParams: {
    edit: string;
    artId: string;
  };
  params: {
    artId: string;
    familyId: string;
  };
}

export default async function Admin({ params }: IAdminProps) {
  return (
    <div className="flex flex-col items-center  min-h-screen px-2 md:p-8 gap-4">
      <div className="flex items-start justify-start py-4 border-b rounded-t w-full gap-2">
        <Link href={`/admin/users/${params.familyId}/arts/${params.artId}`}>
          <IoMdArrowRoundBack size={20} />{" "}
        </Link>
        <h1 className="text-base font-bold">Create Form {params.artId}</h1>
      </div>

      <CreateFrames artId={params?.artId} userId={params.familyId} />
    </div>
  );
}
