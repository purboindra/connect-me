import Image from "next/image";
import React from "react";
import ImageGrid from "./ImageGrid";

interface SavedPostsInterface {
  posts: any[];
}

const SavedPosts = ({ posts }: SavedPostsInterface) => {
  return posts.length > 0 ? (
    <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5   gap-[1px] mt-2">
      {posts.map((post: any) => {
        return (
          <div key={post.postId} className="max-sm:h-[155px] h-full">
            <ImageGrid imageUrl={post.post.imageUrl || ""} />
          </div>
        );
      })}
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
      <h2 className="text-base font-semibold text-neutral-800">
        No post saved
      </h2>
    </div>
  );
};

export default SavedPosts;
