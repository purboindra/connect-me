import { PostInterface } from "@/types";
import React from "react";
import { TabContentProfile } from "./TabContentProfile";
import {
  fetchPostByUserid,
  fetchSavedPostByuserId,
} from "@/app/actions/post.action";
import { parseStringify } from "@/lib/utils";

interface TabsProfileInterface {
  posts: PostInterface[];
  savedPost: any[];
}

export default async function TabsProfile({ userId }: { userId: string }) {
  const [posts, savedPosts] = await Promise.all([
    fetchPostByUserid({
      userId,
    }),
    fetchSavedPostByuserId(
      parseStringify({
        userId,
      })
    ),
  ]);

  return (
    <section className="mt-4">
      <TabContentProfile posts={posts} savedPost={savedPosts} />
    </section>
  );
}
