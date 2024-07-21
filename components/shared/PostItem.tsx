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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSrc(src);
  }, [src]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Avatar type={AvatarEnum.Post} post={post} user={user} />
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
      <div className="relative w-full h-[488px]">
        {post.imageUrl !== null ? (
          <Image
            src={post.imageUrl}
            alt="Post"
            fill
            objectFit="cover"
            className="object-top"
            onErrorCapture={(e) => setSrc("/assets/images/error.png")}
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
