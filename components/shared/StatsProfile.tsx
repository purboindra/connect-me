import { fetchPostByUserid } from "@/app/actions/post.action";
import { UserInterface } from "@/types";
import React from "react";
import { FollowerFollowingStats } from "./FollowerFollowingStats";

interface StatsProfileInterface {
  user: UserInterface;
}

export default async function StatsProfile({ user }: StatsProfileInterface) {
  const posts = await fetchPostByUserid({
    userId: user.id,
  });

  return (
    <section>
      <div className="flex flex-col gap-1">
        <FollowerFollowingStats posts={posts} user={user} />
        <div className="h-[1px] bg-neutral-400 w-full" />
      </div>
    </section>
  );
}
