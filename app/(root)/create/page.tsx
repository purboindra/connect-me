import { CreateForm } from "@/components/shared/CreateForm";
import React from "react";

export default function Post() {
  return (
    <>
      <div className="flex flex-row space-x-4 w-full">
        <div className="w-28 h-24 rounded-md bg-red-300"></div>
        <CreateForm />
      </div>
    </>
  );
}
