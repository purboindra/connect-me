import { deleteLikeComment, likeComment } from "@/app/actions/comment.action";
import { deleteLike, createLike } from "@/app/actions/post.action";
import { Heart } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";

type LikeType = {
  hasLike: boolean;
  likeCount: number;
};

interface LikeCommentInterface {
  commentId: string;
  userId: string;
  initialLike: LikeType;
}

export const LikeComment = ({
  commentId,
  userId,
  initialLike,
}: LikeCommentInterface) => {
  const [_, startTransition] = useTransition();

  const [optimisticState, addOptimistic] = useOptimistic(
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
      addOptimistic({
        hasLike: !optimisticState.hasLike,
        likeCount: optimisticState.hasLike
          ? optimisticState.likeCount - 1
          : optimisticState.likeCount + 1,
      });
    });

    if (optimisticState.hasLike) {
      await deleteLikeComment(
        userId,
        new FormData(e.currentTarget.form as HTMLFormElement)
      );
    } else {
      await likeComment(
        userId,
        new FormData(e.currentTarget.form as HTMLFormElement)
      );
    }
  };

  return (
    <div className="flex flex-row gap-[1px] items-center">
      <form>
        <input type="hidden" name="commentId" value={commentId} />
        <button type="submit" onClick={handleClick}>
          <Heart
            size={14}
            className={`${
              !optimisticState.hasLike
                ? "text-red-500"
                : "text-red-500 fill-current"
            }`}
          />
        </button>
      </form>
      {optimisticState.likeCount > 0 && (
        <p className="text-xs text-neutral-400">{optimisticState.likeCount}</p>
      )}
    </div>
  );
};
