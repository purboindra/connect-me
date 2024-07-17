import Image from "next/image";
import React from "react";

const Reels = () => {
  return (
    <section className="flex flex-col gap-4 h-48 items-center mx-auto justify-center">
      <Image
        src={"/assets/icons/video.svg"}
        alt="video"
        width={64}
        height={64}
        className=" text-neutral-400"
      />
      <h2 className="text-base font-semibold text-neutral-800">
        Belum ada video
      </h2>
    </section>
  );
};

export default Reels;
