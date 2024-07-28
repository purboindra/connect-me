import { logout } from "@/app/actions/auth.action";
import {
  fetchPostByUserid,
  fetchSavedPostByuserId,
} from "@/app/actions/post.action";
import { fetchFollow, getCurrentUser } from "@/app/actions/user.action";
import HeaderProfile from "@/components/shared/HeaderProfile";
import StatsProfile from "@/components/shared/StatsProfile";
import TabsProfile from "@/components/shared/TabsProfile";
import Highlight from "@/components/shared/Highlight";
import React from "react";

export default async function page() {
  /// TODO USE COOKIES OR STORAGE FOR
  /// OPTIMIZE REQUEST

  const user = await getCurrentUser();
  const posts = await fetchPostByUserid({
    userId: user.id,
  });
  const savedPost = await fetchSavedPostByuserId({ userId: user.id });
  const follow = await fetchFollow();

  return (
    <section className="max-w-5xl flex flex-col mx-auto">
      <HeaderProfile user={user} currentUserId={user.id} />
      {/* HIGHLIGHT */}

      <Highlight />

      {/* STATS */}
      <StatsProfile posts={posts} user={user} follow={follow} />

      {/* POST */}
      <TabsProfile posts={posts} savedPost={savedPost} />
    </section>
  );
}
