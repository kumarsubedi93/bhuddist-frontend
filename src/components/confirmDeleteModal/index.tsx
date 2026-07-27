"use client";

import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Button from "../button";
import OutsideClickTracker from "../OutSideClickTracker";
import { apiCall } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ConfirmDeleteModalProps {
  title: string;
  message: string;
  //   onConfirm: () => void;
  //   onCancel: () => void;
  //   isOpen: boolean;
  id: string;
  endpoint?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  title,
  message,
  //   onConfirm,
  //   onCancel,
  //   isOpen,
  id,
  endpoint = "/frames",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  if (!isOpen)
    return (
      <RiDeleteBin2Fill onClick={() => setIsOpen(true)} size={24} color="red" />
    );

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await apiCall(`${endpoint}/${id}`, "DELETE");
      await new Promise((resolve) => {
        setTimeout(() => {
          router.refresh();
          toast.success("deleted successfully");
          resolve("deleted successfully")
        }, 1000);
      });
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <OutsideClickTracker onOutsideClick={() => setIsOpen(false)}>
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="mb-4">{message}</p>
          <div className="flex justify-end">
            <button
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <Button
              loading={isLoading}
              loadingText="deleting...!"
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => handleSubmit()}
            >
              Delete
            </Button>
          </div>
        </div>
      </OutsideClickTracker>
    </div>
  );
};

export default ConfirmDeleteModal;
