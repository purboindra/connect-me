"use client";

import React from "react";

import { dynamicToPostInterface } from "@/lib/utils";
import { PostInterface } from "@/types";
import {
  BookMarkedIcon,
  Heart,
  MessageCircle,
  MoreHorizontal,
  ReplyAll,
} from "lucide-react";

import { motion } from "framer-motion";

import Image from "next/image";

interface FeedItemInterface {
  posts: PostInterface[];
}

export const FeedItem = ({ posts }: FeedItemInterface) => {
  const [isClient, setIsClient] = React.useState(false);

  const isHashtag = (word: string) => word.startsWith("#");

  const renderContent = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={`text-sm font-normal ${
          isHashtag(word)
            ? "text-blue-600 hover:cursor-pointer font-medium"
            : "text-neutral-600"
        }`}
      >
        {word + " "}
      </span>
    ));
  };

  const likes = Math.random() * 301;

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="mt-8 flex flex-col space-y-4 max-md:w-full w-[550px]"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <div className="rounded-full p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
                  <p className="text-sm text-neutral-400">8h</p>
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
            <div className="flex w-full flex-row justify-between">
              <div className="flex flex-row gap-4">
                <Heart size={24} />
                <MessageCircle size={24} />
                <ReplyAll size={24} />
              </div>
              <div className="flex">
                <BookMarkedIcon size={24} />
              </div>
            </div>
            {isClient && (
              <p className="text-sm font-semibold text-neutral-800">{`${likes.toFixed()} likes`}</p>
            )}{" "}
            <div className="flex flex-col gap-1">
              <h1 className="text-base font-semibold text-neutral-700">
                {post.title}
              </h1>
              {isClient && <p>{renderContent(post.content)}</p>}
            </div>
          </div>
        );
      })}
    </>
  );
};
