"use server";

import { revalidatePath } from "next/cache";
import { apiCall } from "./helper";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const handleForm = async (
  url: string,
  method: string,
  formData: string
) => {
  try {
    const { data, error } = await apiCall(url, method, formData);
    console.log(data ,"dataa")
    if (data?.errors || error ) {
      return { error: data.errors.msg || error };
    }
    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
};

export async function updateCookies(cookieName: string, cookievalue: string) {
  console.log(cookieName, cookievalue, "heyyy");
  cookies().set(cookieName, cookievalue);
  return true;
}

export async function deleteCookieByName(cookieName: string) {
  cookies().delete(cookieName);
  return true;
}

export async function serverRedirect(path:string) {
  redirect(path, RedirectType.replace)
}