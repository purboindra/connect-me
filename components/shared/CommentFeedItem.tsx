import { createComment } from "@/app/actions/post.action";
import { CommentInterface, UserInterface } from "@/types";
import React, { useOptimistic, useState, useTransition } from "react";

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

    await createComment(new FormData(e.currentTarget.form as HTMLFormElement));

    setNewComment("");
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
  );
};
