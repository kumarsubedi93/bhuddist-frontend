"use client";

import React, { useEffect, useRef } from "react";
import CreateFrames from "../createFrames";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import { serverRedirect } from "@/lib/action";
import OutsideClickTracker from "../OutSideClickTracker";
import { useRouter } from "next/navigation";

const EditFrame = ({ frameDetails, artId, familyId }: any) => {
  const router = useRouter();

  const handleOutSideClick = () => router.back();

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-[9999] flex justify-center items-center">
      <OutsideClickTracker onOutsideClick={() => handleOutSideClick()}>
        <div className="bg-white p-4 rounded shadow-md w-[400px]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Edit Form {artId}</h2>{" "}
            <MdCancel size={20} onClick={() => handleOutSideClick()} />{" "}
          </div>
          <CreateFrames
            containerClassName="!py-0"
            initialValues={frameDetails}
            className={"!p-0 [&>form]:!block !border-0 !shadow-none"}
            inputFieldClassName="md:!w-full !border-transparent"
            artId={artId}
            userId={familyId}
          />
        </div>
      </OutsideClickTracker>
    </div>
  );
};

export default EditFrame;
