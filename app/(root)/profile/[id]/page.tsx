import { logout } from "@/app/actions/auth.action";
import {
  fetchPostByUserid,
  fetchSavedPostByuserId,
} from "@/app/actions/post.action";
import { getCurrentUser } from "@/app/actions/user.action";
import HeaderProfile from "@/components/shared/HeaderProfile";
import StatsProfile from "@/components/shared/StatsProfile";
import TabsProfile from "@/components/shared/TabsProfile";
import Highlight from "@/components/shared/Highlight";
import React from "react";
import { parseStringify } from "@/lib/utils";

export default async function page({ params }: any) {
  /// TODO USE COOKIES OR STORAGE FOR
  /// OPTIMIZE REQUEST

  const user = await getCurrentUser();
  const posts = await fetchPostByUserid({
    userId: user.id,
  });

  const savedPosts = await fetchSavedPostByuserId(
    parseStringify({
      userId: params.id,
    })
  );

  return (
    <section className="max-w-5xl flex flex-col mx-auto">
      <HeaderProfile posts={posts} user={user} />
      {/* HIGHLIGHT */}

      <Highlight />

      {/* STATS */}
      <StatsProfile posts={posts} user={user} />

      {/* POST */}
      <TabsProfile posts={posts} savedPost={savedPosts} />
    </section>
  );
}
