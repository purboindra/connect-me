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
      <div className="grid grid-cols-5  max-sm:grid-cols-3 gap-2">
        {savedPosts.map((post: any) => (
          <div key={post.post.id} className="max-sm:h-[155px] h-full">
            <Link href={`/post/${post.post.id}`}>
              <ImageGrid imageUrl={post.post.imageUrl || ""} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
