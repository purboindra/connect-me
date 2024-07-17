import React from "react";
import Image from "next/image";
import { PostInterface, UserInterface } from "@/types";
import { AvatarEnum } from "@/lib/enums";

interface AvatarInterface {
  post?: PostInterface;
  user?: UserInterface;
  type: AvatarEnum;
}

const Avatar = ({ post, user, type }: AvatarInterface) => {
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
          <p className="font-semibold text-neutral-800">
            {post?.author.username}
          </p>
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
