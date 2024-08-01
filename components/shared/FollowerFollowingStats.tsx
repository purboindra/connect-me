"use client";

import { useDialog } from "@/hooks/useDialog";
import { DialogEnum } from "@/lib/enums";
import { PostInterface, UserInterface } from "@/types";
import React, { useEffect, useState } from "react";

interface FollowerFollowingStatsInterface {
  posts: PostInterface[];
  user: UserInterface;
}

export const FollowerFollowingStats = ({
  posts,
  user,
}: FollowerFollowingStatsInterface) => {
  const { onOpen, onChangeType } = useDialog();

  return (
    <div className="flex flex-row justify-between w-full py-4">
      <div className="flex flex-col gap-[1px] items-center">
        <h2 className="text-base font-semibold">{posts.length}</h2>
        <p className="text-sm font-mono text-neutral-700">posts</p>
      </div>

      <button
        onClick={() => {
          onOpen();
          onChangeType(DialogEnum.Follow);
        }}
      >
        <div className="flex flex-col gap-[1px] items-center">
          <h2 className="text-base font-semibold">
            {user.followers?.length || 0}
          </h2>
          <p className="text-sm font-mono text-neutral-700">followers</p>
        </div>
      </button>
      <div className="flex flex-col gap-[1px] items-center">
        <h2 className="text-base font-semibold">
          {user.following?.length || 0}
        </h2>
        <p className="text-sm font-mono text-neutral-700">following</p>
      </div>
    </div>
  );
};
