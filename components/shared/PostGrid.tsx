import { PostInterface } from "@/types";
import Image from "next/image";
import React from "react";
import ImageGrid from "./ImageGrid";
import Link from "next/link";

interface PostGridInterface {
  posts: PostInterface[];
}

const PostGrid = ({ posts }: PostGridInterface) => {
  return posts.length > 0 ? (
    <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-[5px] mt-2">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <div className="max-sm:h-[155px] h-full">
            <ImageGrid imageUrl={post.imageUrl || ""} />
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="flex flex-col gap-4 h-48 items-center mx-auto justify-center">
      <Image
        src={"/assets/icons/video.svg"}
        alt="video"
        width={64}
        height={64}
        className=" text-neutral-400"
      />
      <h2 className="text-base font-semibold text-neutral-800">No post yet</h2>
    </div>
  );
};

export default PostGrid;
