import CreateFrames from "@/components/createFrames";

interface IAdminProps {
  searchParams: {
    edit: string;
    artId: string;
  };
}

export default async function Admin({searchParams}: IAdminProps) {
  return (
    <div className="flex flex-col items-center  min-h-screen p-2 md:p-8 gap-4">
      <CreateFrames {...searchParams} />
    </div>
  );
}
