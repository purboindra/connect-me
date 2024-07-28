import { logout } from "@/app/actions/auth.action";
import {
  fetchPostByUserid,
  fetchSavedPostByuserId,
} from "@/app/actions/post.action";
import { fetchUserById, getCurrentUser } from "@/app/actions/user.action";
import HeaderProfile from "@/components/shared/HeaderProfile";
import StatsProfile from "@/components/shared/StatsProfile";
import TabsProfile from "@/components/shared/TabsProfile";
import Highlight from "@/components/shared/Highlight";
import React from "react";
import { parseStringify, verifyToken } from "@/lib/utils";
import { cookies } from "next/headers";

export default async function page({ params }: any) {
  /// TODO USE COOKIES OR STORAGE FOR
  /// OPTIMIZE REQUEST

  const token = cookies().get("access_token");

  const user = await fetchUserById({ userId: params.id });

  const payload = verifyToken(token?.value || "");
  const userId = (payload as any).userId;

  const posts = await fetchPostByUserid({
    userId: user.data.id,
  });

  const savedPosts = await fetchSavedPostByuserId(
    parseStringify({
      userId: params.id,
    })
  );

  return (
    <section className="max-w-5xl flex flex-col mx-auto">
      <HeaderProfile user={user.data} currentUserId={userId} />
      {/* HIGHLIGHT */}

      <Highlight />

      {/* STATS */}
      <StatsProfile posts={posts} user={user.data} follow={""} />

      {/* POST */}
      <TabsProfile posts={posts} savedPost={savedPosts} />
    </section>
  );
}
