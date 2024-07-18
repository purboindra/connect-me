import Image from "next/image";
import React from "react";

const SavedPosts = () => {
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
        Belum ada post
      </h2>
    </section>
  );
};

export default SavedPosts;
