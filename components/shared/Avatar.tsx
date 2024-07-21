"use client";

import React, { useOptimistic, useTransition } from "react";
import Image from "next/image";
import { PostInterface, UserInterface } from "@/types";
import { AvatarEnum } from "@/lib/enums";
import { Plus } from "lucide-react";
import { createFollow, deleteFollow } from "@/app/actions/user.action";

interface AvatarInterface {
  post?: PostInterface;
  user?: UserInterface;
  type: AvatarEnum;
  hasFollow?: boolean;
}

const Avatar = ({ post, user, type, hasFollow }: AvatarInterface) => {
  const [_, startTransition] = useTransition();

  const [optimisticFollow, addOptimisticFollow] = useOptimistic(
    hasFollow || false,
    (currentState: boolean, _: boolean) => !currentState
  );

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(() => addOptimisticFollow(!optimisticFollow));
    if (optimisticFollow) {
      await deleteFollow(new FormData(e.currentTarget.form as HTMLFormElement));
    } else {
      await createFollow(new FormData(e.currentTarget.form as HTMLFormElement));
    }
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      {type === AvatarEnum.Post ? (
        <>
          <div className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="h-[36px] w-[36px] bg-neutral-300 rounded-full">
              {post?.author.photoUrl !== undefined ? (
                <Image
                  src={post?.author.photoUrl}
                  alt="profile"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={"/assets/icons/account.svg"}
                  alt="profile"
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
          <p className="font-semibold text-neutralx-800">
            {post?.author.username}
          </p>
          {post?.author.id.toString() !== user?.id.toString() && (
            <form>
              <input type="hidden" value={post?.author.id} name="userId" />
              <button onClick={handleFollow}>
                <div className="ml-[2px]">
                  {optimisticFollow ? (
                    <p className="text-xs font-medium text-neutral-500">
                      Following
                    </p>
                  ) : (
                    <div className="flex flex-row gap-[1px] items-center">
                      <p className="text-xs flex items-center font-medium text-blue-700">
                        Follow
                      </p>
                      <Plus size={14} className="text-blue-700" />
                    </div>
                  )}
                </div>
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          <div className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="h-[36px] w-[36px] bg-neutral-300 rounded-full">
              {user?.photoUrl !== undefined ? (
                <Image
                  src={post!.author.photoUrl}
                  alt="profile"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={"/assets/icons/account.svg"}
                  alt="profile"
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
          <p className="font-semibold text-neutral-800">{user?.username}</p>
        </>
      )}
    </div>
  );
};

export default Avatar;
