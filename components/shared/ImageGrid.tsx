"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ImageGridInterface {
  imageUrl: string;
}

const ImageGrid = ({ imageUrl }: ImageGridInterface) => {
  const [image, setImage] = useState(imageUrl);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImage(image);
  }, [image]);

  const handleImageError = () => {
    setImage("/assets/icons/error.svg");
    setIsError(true);
  };

  return (
    <div
      className={
        isError
          ? "w-auto h-full flex items-center justify-center bg-neutral-200/40"
          : "w-full h-full"
      }
    >
      <Image
        src={image}
        alt="post"
        width={48}
        height={48}
        className={`object-cover ${
          isError ? "w-auto h-auto" : "w-full h-full"
        }`}
        onError={handleImageError}
      />
    </div>
  );
};

export default ImageGrid;
