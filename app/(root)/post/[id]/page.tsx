import { fetchPostById } from "@/app/actions/post.action";
import { getCurrentUser } from "@/app/actions/user.action";
import { ContentPostById } from "@/components/shared/ContentPostById";
import { ParamsProps } from "@/types";
import console from "console";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: ParamsProps) {
  const [post, currentUser] = await Promise.all([
    fetchPostById({
      postId: params.id,
    }),
    getCurrentUser(),
  ]);

  if (post === undefined) {
    notFound();
  }

  return (
    <main className="flex">
      <ContentPostById post={post} user={currentUser} />
    </main>
  );
}
