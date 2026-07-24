"use client";

import Button from "@/components/button";
import { serverRedirect } from "@/lib/action";
import { apiCall } from "@/lib/helper";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { toast } from "sonner";

interface User {
  _id?: string; 
  familyName: string;
}

type Props = {
  user?: User; // Optional user object for editing
};

const CreateUser = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User>(
    user || {
      familyName: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = user ? "PUT" : "POST"; // Use PUT if editing
      const endpoint = user ? `/family/${user?._id}` : "/family";

      const response = await apiCall(endpoint, method, userData);
      console.log(response ,"RPP")

      toast.success(
        user ? "Family updated successfully" : "Family created successfully"
      );

      serverRedirect("/admin/users");
      console.log("Family saved:", response);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white rounded-lg shadow pt-[30px]"
    >
      <div className="flex  justify-between p-4 border-b rounded-t items-center">
        <h3 className="text-xl font-semibold text-gray-900">
          {user?._id ? "Edit Family" : "Add New Family"}
        </h3>
        <Link
          className="text-white text-base font-bold bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  rounded-lg  px-5 py-2.5 text-center me-2 mb-2 border-transparent m-0 "
          href={"/admin/users"}
        >
          Back
        </Link>
      </div>
      <div className="p-6 space-y-6 mb-4">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor="family-name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Family Name
            </label>
            <input
              type="text"
              name="familyName"
              id="family-name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="Enter family name"
              value={userData?.familyName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
        <Button
          type="submit"
          loading={isLoading}
          loadingText={user ? "Updating" : "Saving"}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {user ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default CreateUser;
