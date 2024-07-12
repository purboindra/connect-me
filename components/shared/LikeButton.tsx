"use client";

import { createLike, deleteLike } from "@/app/actions/post.action";
import { Heart, HeartOff } from "lucide-react";
import React, { useOptimistic } from "react";

type LikeType = {
  hasLike: boolean;
  likeCount: number;
};

interface LikeButtonInterface {
  postId: string;
  initialLikeCount: LikeType;
  hasLiked: boolean;
}

export const LikeButton = ({
  postId,
  initialLikeCount,
  hasLiked,
}: LikeButtonInterface) => {
  const [optimisticLike, addOptimisticLike] = useOptimistic(
    initialLikeCount,
    (currentState: LikeType, optimisticValue: LikeType) => ({
      hasLike: !currentState.hasLike,
      likeCount: currentState.hasLike
        ? currentState.likeCount - 1
        : currentState.likeCount + 1,
    })
  );

  return !optimisticLike.hasLike ? (
    <form action={createLike}>
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        onClick={async () => {
          addOptimisticLike({
            hasLike: (optimisticLike.hasLike = true),
            likeCount: optimisticLike.likeCount + 1,
          });
        }}
      >
        <Heart size={24} className="text-red-500" />
      </button>
    </form>
  ) : (
    <form action={deleteLike}>
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        onClick={async () => {
          addOptimisticLike({
            hasLike: (optimisticLike.hasLike = false),
            likeCount: optimisticLike.likeCount - 1,
          });
        }}
      >
        <Heart size={24} className="text-red-500 fill-current" />
      </button>
    </form>
  );
};
