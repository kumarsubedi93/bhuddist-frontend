import UsersList from "@/components/usersList";
import { apiCall } from "@/lib/helper";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Users",
  description: "Users list",
};

const page = async (props: Props) => {
  const { data } = await apiCall(`/families`);
  console.log(data ,"fff")
  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="flex justify-between items-center w-full  border shadow-lg px-4 py-2 ">
        <h1 className="md:ml-0 ml-8 font-bold text-base leading-6"></h1>
        <Link
          className="text-white text-base font-semibold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  rounded-lg  px-5 py-2.5 text-center me-2 mb-2 border-transparent m-0 "
          href={"/admin/users/create"}
        >
          Add new Family
        </Link>
      </div>
      <UsersList users={data?.families ?? []} />
    </div>
  );
};

export default page;
