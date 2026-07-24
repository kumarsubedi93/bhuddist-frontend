'use client'

import React from "react";

type Props = {};

const NoDataFound = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full flex-col">
      <div className="w-60 relative bg-[url('../assets/emptyImage.png')] bg-contain min-h-[180px] child bg-no-repeat" />
      <p className="text-base font-bold leading-6">No Data Found</p> 
    </div>
  );
};

export default NoDataFound;
