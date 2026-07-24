"use client";

import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../button";
import { InputFields, form1Validator } from "./helper";
import { handleForm, serverRedirect } from "@/lib/action";

const initialState = {
  name1: "",
  name2: "",
  name3: "",
  name4: "",
  name5: "",
  singlePrice: "",
  packagePrice: "",
};

interface ICreateFramesProps {
  initialValues?: any;
  className?: string;
  inputFieldClassName?: string;
  containerClassName?: string;
  artId?: string | number;
  userId?:string
}

const CreateFrames = ({
  initialValues = initialState,
  className,
  inputFieldClassName,
  containerClassName,
  artId = 1,
  userId,
}: ICreateFramesProps) => {
  const [formData, setFormData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>({});

  const searchParams = useSearchParams();
  const pathName = usePathname();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let method = "POST";
      let url = "/frames";
      const editId = searchParams.get("edit");
      if (editId) {
        (method = "PUT"), (url = `/frames/${editId}`);
      }
      const { error } = await handleForm(url, method, { ...formData, artId , familyId : userId});
      if (error) {
        return toast.error(error);
      }
      setFormData(initialValues);
      toast.success(
        editId ? "form updated Successfully" : "form submitted successfully"
      );
      serverRedirect(`/admin/users/${userId}/arts/${artId}`)
    } catch (error: any) {
      return toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // it will return true if there is any error
  const validateForm = (name: any, value: string) => {
    try {
      const validation = form1Validator[name] ?? {};
      if ((+artId === 5 ) && validation && (value.length > validation.maxLength)) {
        setErrorMessage((prev: any) => ({
          ...prev,
          [name]: `Maximum ${validation.maxLength} characters allowed`,
        }));
        return true;
      }
      return;
    } catch (error) {
      return false;
    }
  };

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const isError = validateForm(target.name, target.value);
    console.log(isError, "isError");
    if (!isError) {
      setFormData(() => ({
        ...formData,
        [target.name]: target.value,
      }));
    }
  };
  const chineseNumerals = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  console.log(formData, "form", userId);
  return (
    <div className={`py-10 flex w-full items-center ${containerClassName}`}>
      <div className="w-full">
        <div
          className={`bg-white p-10 rounded-lg shadow-lg border  ${
            className ?? ""
          }`}
        >
          <form
            method="post"
            onSubmit={handleSubmit}
            className="md:flex md:flex-wrap md:justify-between"
          >
            {InputFields.filter(({ includedInArts, name }) =>
              includedInArts?.includes(+artId) && name != 'packagePrice'
            ).map(({ label, name, isSpace }) => (
              <div
                className={`mb-5 md:w-[49%] ${inputFieldClassName ?? ""}`}
                key={name}
              >
                {!isSpace ? (
                  <>
                    <label
                      htmlFor={name}
                      className="block mb-2 font-bold text-gray-600"
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      id={name}
                      name={name}
                      placeholder={`Enter ${name}`}
                      className="border border-gray-300 shadow p-3 w-full rounded mb-"
                      value={formData[name] || ""}
                      onChange={handleChange}
                      onBlur={() =>
                        setErrorMessage((prev: any) => ({
                          ...prev,
                          [name]: undefined,
                        }))
                      }
                    />
                    <span className="text-red-500 text-base font-medium">
                      {errorMessage[name]}
                    </span>
                  </>
                ) : (
                  <Fragment>
                    <label
                      htmlFor={name}
                      className="block mb-2 font-bold text-gray-600"
                    >
                      Select space
                    </label>
                    <select
                      id={name}
                      name={name}
                      className="border border-gray-300 shadow p-3 w-full rounded mb-"
                      onChange={handleChange}
                      value={formData[name] || ''}
                    >
                      <option value={''}>Choose space</option>
                      <option value={' '}>Default</option>
                      {chineseNumerals.map((numeral) => (
                        <option key={numeral} value={numeral}>
                          {numeral}
                        </option>
                      ))}
                    </select>
                  </Fragment>
                )}
              </div>
            ))}
            <div className="w-full flex justify-end">
              <Button
                loading={isLoading}
                type="submit"
                className="block min-w-40 bg-blue-500 text-white font-bold p-4 rounded-lg"
                loadingText="submitting..."
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFrames;
