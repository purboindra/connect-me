"use client";

import React from "react";

import { PostInterface, UserInterface } from "@/types";

import { InteractionItem } from "./InteractionItem";
import { PostItem } from "./PostItem";
import { TruncateText } from "./TruncateText";
import { CommentFeedItem } from "./CommentFeedItem";
import Link from "next/link";

interface FeedItemInterface {
  posts: PostInterface[];
  user: UserInterface;
}

export const FeedItem = ({ posts, user }: FeedItemInterface) => {
  const [mounted, setMounted] = React.useState(false);

  const isHashtag = (word: string) => word.startsWith("#");

  const renderContent = (text: string) => {
    return text.split(" ").map((word, index) => {
      if (isHashtag(word)) {
        return (
          <Link href={`/hashtag/${word.replace("#", "")}`} key={index}>
            <span className="text-sm  text-blue-600 hover:cursor-pointer font-medium">
              {word + " "}
            </span>
          </Link>
        );
      } else {
        return (
          <span key={index} className="text-sm font-normal text-neutral-600">
            {word + " "}
          </span>
        );
      }
    });
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {posts.map((post) => {
        const hasLiked =
          user &&
          post.likes.find(
            (like) => like.userId.toString() === user.id.toString()
          ) !== undefined;

        const hasSaved =
          user &&
          post.savedBy.find(
            (like) => like.userId.toString() === user.id.toString()
          ) !== undefined;

        return (
          <div
            key={post.id}
            className="mt-8 flex flex-col max-md:w-full w-[550px]"
          >
            <PostItem post={post} user={user} />
            <InteractionItem
              postId={post.id.toString()}
              initialLike={{
                hasLike: hasLiked,
                likeCount: post.likes.length,
              }}
              hasSaved={hasSaved}
              hasLiked={hasLiked}
            />
            <div className="flex flex-col text-neutral-700">
              {mounted && (
                <span className="font-semibold">
                  {post.author.username}{" "}
                  <TruncateText maxLength={15}>
                    {renderContent(post.content)}
                  </TruncateText>
                </span>
              )}
            </div>
            <CommentFeedItem
              comments={post.comments}
              postId={post.id}
              user={user}
              post={post}
            />
            <div className=" h-[1px] bg-neutral-500 mt-6 flex" />
          </div>
        );
      })}
    </>
  );
};
