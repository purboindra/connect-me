import { fetchSavedPostByuserId } from "@/app/actions/post.action";
import { getCurrentUser } from "@/app/actions/user.action";
import ImageGrid from "@/components/shared/ImageGrid";
import React from "react";
import Image from "next/image";
import { EmptyContent } from "@/components/shared/EmptyContent";

export default async function page() {
  const user = await getCurrentUser();
  const savedPosts = await fetchSavedPostByuserId({ userId: user.id });

  return (
    <section className="flex flex-col max-w-5xl mx-auto">
      <h1 className="text-3xl max-sm:text-lg font-bold text-neutral-800">
        Saved Post
      </h1>
      {savedPosts.length > 0 ? (
        <div className="grid grid-cols-5  max-sm:grid-cols-3 gap-2">
          {savedPosts.map((post: any) => (
            <div key={post.post.id} className="max-sm:h-[155px] h-full">
              <ImageGrid imageUrl={post.post.imageUrl || ""} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyContent
          title={"No post saved"}
          imageUrl={"/assets/icons/video.svg"}
        />
      )}
    </section>
  );
}
