"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../button";
import { apiCall } from "@/lib/helper";
import { serverRedirect, updateCookies } from "@/lib/action";
import { toast } from "sonner";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { name, password } = formData;

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      const { data, error } = await apiCall("/users/signin", "POST", {
        ...formData,
        email: formData.name,
      });
      if (data.errors || error) {
        toast.error(data.errors.msg || error);
        return
      }
      if (data.token) {
       await updateCookies("token", data.token);
       router.push('/admin/users')
      //  serverRedirect('/admin/users')
      }
      toast.success("logged In successfully");
      setFormData({
        name: "",
        password: "",
      });
    } catch (error: any) {
      return toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormData(() => ({
      ...formData,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="py-10 flex items-center">
      <div className="w-full md:w-[420px]">
        <div className="bg-white p-10 rounded-lg shadow-lg border border-transparent">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter email or username"
                className="border shadow p-3 w-full rounded mb-"
                value={name}
                onChange={handleChange}
                required={true}
              />
            </div>

            <div className="mb-5 relative">
              <label
                htmlFor="twitter"
                className="block mb-2 font-bold text-gray-600"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password"
                className="border shadow p-3 w-full rounded mb-"
                value={password}
                onChange={handleChange}
                required={true}
              />
            </div>
            <Button
              loading={isLoading}
              type="submit"
              className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              loadingText="submitting..."
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
