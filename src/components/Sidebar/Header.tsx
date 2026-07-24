import React from "react";
import Button from "../button";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  artId?: any;
  createArtId: any;
};

const SideBarHeader = ({
  children,
  onClick,
  className,
  createArtId,
  artId,
}: Props) => {
  return (
    <div className="flex justify-between items-center w-full  border shadow-lg px-4 py-2">
      <h1 className="md:ml-0 ml-8 font-bold text-base leading-6">
        {createArtId ? `Create Form ${createArtId}` : `Form ${artId}`}
      </h1>
      <Button
        className="text-white text-base font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  rounded-lg  px-5 py-2.5 text-center me-2 mb-2 "
        loading={false}
        onClick={() => onClick()}
      >
        {children}
      </Button>
    </div>
  );
};

export default SideBarHeader;
