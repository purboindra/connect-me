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

import Image from "next/image";
import { InteractionItem } from "./InteractionItem";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PostItem } from "./PostItem";
import { TruncateText } from "./TruncateText";

interface FeedItemInterface {
  posts: PostInterface[];
  user: any;
}

export const FeedItem = ({ posts, user }: FeedItemInterface) => {
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

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {posts.map((post) => {
        const hasLiked =
          user &&
          post.likes.find(
            (like) => like.userId.toString() === user.id.toString()
          ) !== undefined;

        return (
          <div
            key={post.id}
            className="mt-8 flex flex-col max-md:w-full w-[550px] "
          >
            <PostItem post={post} />
            <InteractionItem
              postId={post.id.toString()}
              initialLike={{
                hasLike: hasLiked,
                likeCount: post.likes.length,
              }}
              hasLiked={hasLiked}
            />
            <div className="flex flex-col text-neutral-700">
              {isClient && (
                <span className="font-semibold">
                  {post.author.username}{" "}
                  <TruncateText maxLength={15}>
                    {renderContent(post.content)}
                  </TruncateText>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
