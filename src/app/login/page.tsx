import Form from "@/components/form";
import { Metadata } from "next";

export const metadata : Metadata ={
  title: "Login",
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Form />
    </div>
  );
}
