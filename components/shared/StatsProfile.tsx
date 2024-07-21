import { PostInterface, UserInterface } from "@/types";
import React from "react";

interface StatsProfileInterface {
  user: UserInterface;
  posts: PostInterface[];
  follow: any;
}

const StatsProfile = ({ user, posts, follow }: StatsProfileInterface) => {
  return (
    <section>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between w-full py-4">
          <div className="flex flex-col gap-[1px] items-center">
            <h2 className="text-base font-semibold">{posts.length}</h2>
            <p className="text-sm font-mono text-neutral-700">posts</p>
          </div>
          <div className="flex flex-col gap-[1px] items-center">
            <h2 className="text-base font-semibold">
              {user.followers?.length || 0}
            </h2>
            <p className="text-sm font-mono text-neutral-700">followers</p>
          </div>
          <div className="flex flex-col gap-[1px] items-center">
            <h2 className="text-base font-semibold">
              {user.following?.length || 0}
            </h2>
            <p className="text-sm font-mono text-neutral-700">following</p>
          </div>
        </div>
        <div className="h-[1px] bg-neutral-400 w-full" />
      </div>
    </section>
  );
};

export default StatsProfile;
