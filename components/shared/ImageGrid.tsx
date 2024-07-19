import React from "react";
import Image from "next/image";

interface ImageGridInterface {
  imageUrl: string;
}

const ImageGrid = ({ imageUrl }: ImageGridInterface) => {
  return (
    <Image
      src={imageUrl}
      alt="post"
      width={100}
      height={50}
      className="object-cover w-full h-full"
    />
  );
};

export default ImageGrid;
