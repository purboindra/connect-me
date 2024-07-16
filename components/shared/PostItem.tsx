"use client";

import { PostInterface } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import DateComponent from "./DateFeedItem";

interface PostItemInterface {
  post: PostInterface;
}

export const PostItem = ({ post }: PostItemInterface) => {
  const [src, setSrc] = useState(post.imageUrl);

  useEffect(() => {
    setSrc(src);
  }, [src]);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <div className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="h-[36px] w-[36px] bg-neutral-300 rounded-full">
              {post.author.photoUrl !== undefined ? (
                <Image
                  src={post.author.photoUrl}
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
            {post.author.username}
          </p>
          <p className="text-sm text-neutral-400">
            <DateComponent dateString={post.created_at.toString()} />
          </p>
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
