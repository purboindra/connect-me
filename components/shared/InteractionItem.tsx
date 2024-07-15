"use client";

import { createLike, deleteLike } from "@/app/actions/post.action";
import { BookMarkedIcon, Heart, MessageCircle, ReplyAll } from "lucide-react";
import React, { startTransition, useOptimistic } from "react";

type LikeType = {
  hasLike: boolean;
  likeCount: number;
};

interface InteractionItemInterface {
  postId: string;
  initialLike: LikeType;
  hasLiked: boolean;
}

export const InteractionItem = ({
  postId,
  initialLike,
}: InteractionItemInterface) => {
  const [optimisticLike, addOptimisticLike] = useOptimistic(
    initialLike,
    (currentState: LikeType, _: LikeType) => {
      return {
        hasLike: !currentState.hasLike,
        likeCount: currentState.hasLike
          ? currentState.likeCount - 1
          : currentState.likeCount + 1,
      };
    }
  );

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(() => {
      addOptimisticLike({
        hasLike: !optimisticLike.hasLike,
        likeCount: optimisticLike.hasLike
          ? optimisticLike.likeCount - 1
          : optimisticLike.likeCount + 1,
      });
    });

    if (optimisticLike.hasLike) {
      await deleteLike(new FormData(e.currentTarget.form as HTMLFormElement));
    } else {
      await createLike(new FormData(e.currentTarget.form as HTMLFormElement));
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <form>
            <input type="hidden" name="postId" value={postId} />
            <button type="submit" onClick={handleClick}>
              <Heart
                size={24}
                className={`${
                  !optimisticLike.hasLike
                    ? "text-red-500"
                    : "text-red-500 fill-current"
                }`}
              />
            </button>
          </form>
          <MessageCircle size={24} />
          <ReplyAll size={24} />
        </div>
        <div className="flex">
          <BookMarkedIcon size={24} />
        </div>
      </div>
      {optimisticLike.likeCount > 0 && (
        <p className="font-semibold text-neutral-800">{`${optimisticLike.likeCount} likes`}</p>
      )}
    </div>
  );
};
