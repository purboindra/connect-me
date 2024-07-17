import { PostInterface } from "@/types";
import Image from "next/image";
import React from "react";

interface PostGridInterface {
  posts: PostInterface[];
}

const PostGrid = ({ posts }: PostGridInterface) => {
  return (
    <div className="w-full grid grid-cols-3 gap-[1px] mt-2">
      {posts.map((post) => (
        <div key={post.id} className="h-[155px]">
          <Image
            src={post!.imageUrl || ""}
            alt="post"
            width={100}
            height={50}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
