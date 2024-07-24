import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col max-w-5xl mx-auto justify-center items-center max-sm:flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="h-72 max-md:w-full w-[550px] rounded-2xl"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
