import { createComment } from "@/app/actions/post.action";
import { CommentInterface, UserInterface } from "@/types";
import React, { useOptimistic, useState, useTransition } from "react";
import Image from "next/image";

interface CommentFeedItemInterface {
  postId: string;
  user: UserInterface;
  comments: Array<CommentInterface>;
}

export const CommentFeedItem = ({
  postId,
  user,
  comments,
}: CommentFeedItemInterface) => {
  const [_, startTransition] = useTransition();

  const [newComment, setNewComment] = useState("");

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    comments,
    (state, newComments: CommentInterface) => [...state, newComments]
  );

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(() => {
      addOptimisticMessage({
        content: newComment,
        createdAt: Date.now(),
        postid: postId,
        userId: user.id,
      });
    });

    setNewComment("");

    await createComment(new FormData(e.currentTarget.form as HTMLFormElement));
  };

  return (
    <div className="mt-1 flex flex-col gap-1 w-full">
      {optimisticMessages.length < 2 && (
        <>
          {optimisticMessages.map((comment, index) => (
            <div className="flex gap-1 items-center" key={index}>
              <span className="font-semibold text-neutral-800">
                <h2>{user.username}</h2>
              </span>
              <span>
                <p className="text-sm text-neutral-800">{comment.content}</p>
              </span>
            </div>
          ))}
        </>
      )}

      {optimisticMessages.length > 1 && (
        <h2 className="text-sm font-medium text-neutral-500 hover:cursor-pointer">
          {`View all ${optimisticMessages.length} comments`}
        </h2>
      )}
      <div className="flex gap-1">
        <span className="text-sm font-normal text-neutral-600">Comment as</span>
        <span>
          <h2 className="text-sm font-semibold text-neutral-600">
            {user.username}
          </h2>
        </span>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <div className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="h-[22px] w-[22px] bg-neutral-300 rounded-full">
            {user.photoUrl !== undefined ? (
              <Image src={user.photoUrl} alt="profile" width={48} height={48} />
            ) : (
              <Image
                src={"/assets/icons/account.svg"}
                alt="profile"
                width={48}
                height={48}
              />
            )}
          </div>
        </div>
        <form className="flex w-full gap-1 justify-between items-center">
          <input
            placeholder="Write a comment..."
            name="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            className="text-sm font-normal text-neutral-600 p-1 w-full focus:outline-none focus:border-none"
          />
          <input type="hidden" name="postId" value={postId} />

          <button
            className="text-xs font-medium text-blue-600"
            onClick={handleClick}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
