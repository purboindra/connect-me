"use client";

import { PostInterface, UserInterface } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import DateComponent from "./DateFeedItem";
import Avatar from "./Avatar";
import { AvatarEnum } from "@/lib/enums";

interface PostItemInterface {
  post: PostInterface;
  user: UserInterface;
}

export const PostItem = ({ post, user }: PostItemInterface) => {
  const [src, setSrc] = useState(post.imageUrl);

  const [isErrorImage, setIserrorImage] = useState(false);

  const [mounted, setMounted] = useState(false);

  const [hasFollow, setHasFollow] = useState(false);

  useEffect(() => {
    const followed = user.following.some((follow) => {
      return follow.followedUserId.toString() == post.author.id;
    });
    setHasFollow(followed);
  }, [post.author.id, user.followers, user.following]);

  useEffect(() => {
    setSrc(src);
  }, [src]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageError = () => {
    setSrc("/assets/icons/error.svg");
    setIserrorImage(true);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Avatar
            type={AvatarEnum.Post}
            post={post}
            user={user}
            hasFollow={hasFollow}
          />
          {mounted && (
            <p className="text-sm text-neutral-400">
              <DateComponent dateString={post.created_at.toString()} />
            </p>
          )}
        </div>
        <MoreHorizontal
          size={24}
          className="text-neutral-500 hover:cursor-pointer"
        />
      </div>
      <div
        className={`relative w-full h-[488px] ${
          isErrorImage && "flex items-center justify-center bg-neutral-200/40"
        }`}
      >
        {post.imageUrl !== null ? (
          <Image
            src={src || ""}
            alt="Post"
            width={500}
            height={500}
            priority
            className={`object-top ${
              !isErrorImage ? "w-full h-full" : "h-24 w-24"
            } `}
            onError={handleImageError}
          />
        ) : (
          <div className="h-full w-full bg-neutral-300">
            <p className="text-center flex items-center justify-center h-full text-neutral-600">
              No Image
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
