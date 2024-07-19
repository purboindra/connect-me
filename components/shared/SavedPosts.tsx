import Image from "next/image";
import React from "react";
import ImageGrid from "./ImageGrid";

interface SavedPostsInterface {
  posts: any[];
}

const SavedPosts = ({ posts }: SavedPostsInterface) => {
  console.log(posts);
  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5   gap-[1px] mt-2">
      {posts.map((post: any) => (
        <div key={post.id} className="max-sm:h-[155px] h-full">
          <ImageGrid imageUrl={post!.imageUrl || ""} />
        </div>
      ))}
    </div>
  );
};

export default SavedPosts;
