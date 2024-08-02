import { fetchSavedPostByuserId } from "@/app/actions/post.action";
import { getCurrentUser } from "@/app/actions/user.action";
import ImageGrid from "@/components/shared/ImageGrid";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();
  const savedPosts = await fetchSavedPostByuserId({ userId: user.id });

  if (savedPosts.length === 0) {
    notFound();
  }

  return (
    <section className="flex flex-col max-w-5xl mx-auto">
      <h1 className="text-3xl max-sm:text-lg font-bold text-neutral-800">
        Saved Post
      </h1>
      <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5   gap-[1px] mt-2">
        {savedPosts.map((post: any) => {
          return (
            <Link key={post.postId} href={`/post/${post.postId}`}>
              <div className="max-sm:h-[155px] h-full">
                <ImageGrid imageUrl={post.post.imageUrl || ""} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
