import React from "react";
import Image from "next/image";

interface EmptyContentInterface {
  title: string;
  imageUrl: string;
}

export const EmptyContent = ({ title, imageUrl }: EmptyContentInterface) => {
  return (
    <div className="flex flex-col gap-4 h-48 items-center mx-auto justify-center">
      <Image
        src={imageUrl}
        alt="video"
        width={64}
        height={64}
        className=" text-neutral-400"
      />
      <h2 className="text-base font-semibold text-neutral-800">{title}</h2>
    </div>
  );
};
