import { PostInterface } from "@/types";
import Image from "next/image";
import React from "react";
import ImageGrid from "./ImageGrid";

interface PostGridInterface {
  posts: PostInterface[];
}

const PostGrid = ({ posts }: PostGridInterface) => {
  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5   gap-[1px] mt-2">
      {posts.map((post) => (
        <div key={post.id} className="max-sm:h-[155px] h-full">
          <ImageGrid imageUrl={post!.imageUrl || ""} />
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
