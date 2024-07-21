"use client";

import {
  createLike,
  deleteLike,
  deleteSavePost,
  savePost,
} from "@/app/actions/post.action";
import { BookMarkedIcon, Heart, MessageCircle, ReplyAll } from "lucide-react";
import Image from "next/image";
import React, { useOptimistic, useTransition } from "react";

type LikeType = {
  hasLike: boolean;
  likeCount: number;
};

interface InteractionItemInterface {
  postId: string;
  initialLike: LikeType;
  hasLiked: boolean;
  hasSaved: boolean;
}

export const InteractionItem = ({
  postId,
  initialLike,
  hasSaved,
}: InteractionItemInterface) => {
  const [_, startTransition] = useTransition();

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

  const [optimisticSave, addOptimisticSave] = useOptimistic(
    hasSaved,
    (currentState: boolean, _: boolean) => !currentState
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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(() => {
      addOptimisticSave(!optimisticSave);
    });

    if (optimisticLike) {
      await deleteSavePost(
        new FormData(e.currentTarget.form as HTMLFormElement)
      );
    } else {
      await savePost(new FormData(e.currentTarget.form as HTMLFormElement));
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
          <Image
            src={"/assets/icons/share.svg"}
            alt="Share"
            width={28}
            height={28}
            className="object-fill"
          />
        </div>
        <div className="flex">
          <form>
            <input type="hidden" name="postId" value={postId} />
            <button type="submit" onClick={handleSave}>
              <Image
                src={`${
                  optimisticSave
                    ? "/assets/icons/save_fill.svg"
                    : "/assets/icons/save.svg"
                }`}
                alt="Save"
                width={18}
                height={18}
              />
            </button>
          </form>
        </div>
      </div>
      {optimisticLike.likeCount > 0 && (
        <p className="font-semibold text-neutral-800">{`${optimisticLike.likeCount} likes`}</p>
      )}
    </div>
  );
};
