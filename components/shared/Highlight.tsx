import { Plus } from "lucide-react";
import React from "react";

const Highlight = () => {
  return (
    <div className="mt-2 flex flex-col gap-1 w-full">
      <div className="flex flex-col w-fit items-center gap-1">
        <div className="h-16 w-16 rounded-full items-center flex bg-neutral-600">
          <div className="flex items-center mx-auto justify-center">
            <Plus size={32} className="text-white" />
          </div>
        </div>
        <h2 className="text-base">New</h2>
      </div>
      <div className="h-[1px] bg-neutral-400 w-full" />
    </div>
  );
};

export default Highlight;
