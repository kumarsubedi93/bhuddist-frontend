import React from "react";
import Reports from "./reports";
import { apiCall } from "@/lib/helper";
import { Metadata } from "next";

const frameTypes = [1, 2, 3, 4, 5];

export const metadata : Metadata ={
  title: "Reports",
}

interface Props {
  searchParams: {
    year:string;
  };
}

const page = async ({searchParams}:Props) => {
  const promises = frameTypes.map(type => 
    apiCall(`/frames/filter?limit=${"5000000"}&page=${"1"}&artId=${type}&year=${searchParams.year || new Date().getFullYear()}`)
  );

  const results = await Promise.all(promises);

  const frames = results.reduce((acc, result, index) => {
    console.log(result.data?.frames?.[0] ,"ress", index)
    acc[frameTypes[index]] = result.data?.frames?.[0]?.[`art${index + 1 || 1}`] || [];;
    return acc;
  }, {});

  return (
    <div>
      <Reports frames={frames} />
    </div>
  );
};

export default page;
