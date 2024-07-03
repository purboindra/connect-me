import { CreateForm } from "@/components/shared/CreateForm";
import React from "react";

export default function Post() {
  return (
    <>
      <div className="flex flex-row space-x-4 w-full">
        <CreateForm />
      </div>
    </>
  );
}
