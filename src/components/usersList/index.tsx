"use client";

import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineFolderView } from "react-icons/ai";
import Link from "next/link";
import { BiCommentDetail } from "react-icons/bi";
import ConfirmDeleteModal from "../confirmDeleteModal";

interface Iuser {
  serialNumber: number;
  familyName: string;
  totalFrames: string;
  _id: string;
}

const UsersList: React.FC<{ users: Iuser[] }> = ({ users }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase">
          <tr className="bg-gray-50">
            <th scope="col" className="px-6 py-3 bg-gray-50">
              S No.
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Family Name
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Edit
            </th>
            <th scope="col" className="px-6 py-3">
              View
            </th>
            <th scope="col" className="px-6 py-3">
              Summary
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.serialNumber} className="border-b border-gray-200">
              <td className="px-6 py-4 bg-gray-50">{user.serialNumber}</td>
              <td className="px-6 py-4">{user.familyName}</td>
              <td className="px-6 py-4 bg-gray-50">{user.totalFrames}</td>
              <td className="px-6 py-4 cursor-pointer">
                <Link
                  className="flex justify-start"
                  href={`/admin/users/create?userId=${user?._id}`}
                >
                  <MdOutlineModeEdit size={20} />
                </Link>
              </td>

              <td className="px-6 py-4 bg-gray-50 cursor-pointer">
                <Link className="flex justify-start" href={`/admin/users/${user?._id}/arts/1`}>
                  <AiOutlineFolderView size={20} />
                </Link>
              </td>
              <td className="px-6 py-4 bg-gray-50 cursor-pointer">
                <Link className="flex justify-start" href={`/admin/users/${user?._id}/arts`}>
                  <BiCommentDetail size={16} />
                </Link>
              </td>
              <td className="px-6 py-4 cursor-pointer">
                <ConfirmDeleteModal
                  title="Confirm Delete"
                  message="Are you sure you want to delete this family? This cannot be undone."
                  id={user._id}
                  endpoint="/family"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
