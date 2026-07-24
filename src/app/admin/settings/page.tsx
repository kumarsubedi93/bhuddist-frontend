import { Metadata } from "next";
import React from "react";
import Settings from "./setting";
import { apiCall } from "@/lib/helper";

type Props = {};

export const metadata: Metadata = {
  title: "Settings",
};

const page = async (props: Props) => {
  const data = await apiCall("/arts");
  const arts = data?.data?.arts;

  return (
    <div>
      <Settings arts={arts} />
    </div>
  );
};

export default page;
