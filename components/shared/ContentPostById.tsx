"use client";

import { PostInterface, UserInterface } from "@/types";
import React from "react";
import { CommentFeedItem } from "./CommentFeedItem";
import { InteractionItem } from "./InteractionItem";
import { PostItem } from "./PostItem";
import { TruncateText } from "./TruncateText";

interface ContentPostByIdParams {
  post: PostInterface;
  user: UserInterface;
}

export const ContentPostById = ({ post, user }: ContentPostByIdParams) => {
  const [mounted, setMounted] = React.useState(false);
  const [hasLiked, setHasLiked] = React.useState(false);
  const [hasSaved, setHasSaved] = React.useState(false);

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
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const hasLiked =
      user &&
      post.likes.find(
        (like) => like.userId.toString() === user.id.toString()
      ) !== undefined;

    setHasLiked(hasLiked);

    const hasSaved =
      user &&
      post.savedBy.find(
        (like) => like.userId.toString() === user.id.toString()
      ) !== undefined;

    setHasSaved(hasSaved);
  }, [post, post.likes, post.savedBy, user]);

  return (
    <div key={post.id} className="mt-8 flex flex-col max-md:w-full w-[550px]">
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
};
