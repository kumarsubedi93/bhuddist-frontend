import { Metadata } from "next";
import CreateUser from "./form";
import { apiCall } from "@/lib/helper";

export const metadata: Metadata = {
  title: "Create User",
  description: "Create a new user",
};

type Props = {
  searchParams: {
    userId: string;
  };
};

const page = async ({ searchParams }: Props) => {
  let family;

  if (searchParams?.userId) {
    const { data } = await apiCall(`/family/${searchParams?.userId}`);
    family = data?.family;
  }
  return (
    <div className="p-4">
      <CreateUser user={family} />
    </div>
  );
};

export default page;
