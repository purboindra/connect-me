import { createComment } from "@/app/actions/post.action";
import { CommentInterface, PostInterface, UserInterface } from "@/types";
import React, {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import { useDialog } from "@/hooks/useDialog";
import { DialogEnum } from "@/lib/enums";
import { Heart } from "lucide-react";
import { LikeComment } from "./LikeComment";
import { comment } from "postcss";

interface CommentDialogParams {
  post: PostInterface;
  user: UserInterface;
}

interface CommentFeedItemInterface {
  postId: string;
  user: UserInterface;
  post: PostInterface;
  comments: Array<CommentInterface>;
}

export const CommentFeedItem = ({
  postId,
  user,
  comments,
  post,
}: CommentFeedItemInterface) => {
  const [_, startTransition] = useTransition();

  const [newComment, setNewComment] = useState("");

  const { onOpen, onChangeType, setData, onClose, isOpen } = useDialog();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    comments,
    (state, newComments: CommentInterface) => [...state, newComments]
  );

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(() => {
      addOptimisticMessage({
        id: "",
        content: newComment,
        createdAt: Date.now(),
        postid: postId,
        userId: user.id,
        author: user,
        likes: [],
      });
    });

    setNewComment("");

    await createComment(new FormData(e.currentTarget.form as HTMLFormElement));
  };

  const handlePopDialog = () => {
    onOpen();
    onChangeType(DialogEnum.Feed);
    setData({
      post: post,
      user: user,
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="mt-1 flex flex-col gap-1 w-full" ref={dialogRef}>
      {optimisticMessages.map((comment, index) => {
        const hasLiked =
          user &&
          comment.likes !== undefined &&
          comment.likes.find(
            (commentItem) =>
              commentItem.userId.toString() === user.id.toString()
          ) !== undefined;
        return (
          <div className="flex gap-1 items-center justify-between" key={index}>
            <div className="flex flex-row items-center gap-1">
              <span className="font-semibold text-neutral-800">
                <h2>{`${
                  comment.author.username === user?.username
                    ? "You"
                    : `${comment.author.username}`
                }`}</h2>
              </span>
              <span>
                <p className="text-sm text-neutral-800">{comment.content}</p>
              </span>
            </div>
            <LikeComment
              commentId={comment.id}
              initialLike={{
                hasLike: hasLiked,
                likeCount: comment.likes.length,
              }}
              userId={user?.id}
            />
          </div>
        );
      })}

      <div className="flex gap-1">
        <span className="text-sm font-normal text-neutral-600">Comment as</span>
        <span>
          <h2 className="text-sm font-semibold text-neutral-600">
            {user?.username}
          </h2>
        </span>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <div className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="h-[22px] w-[22px] bg-neutral-300 rounded-full">
            {user?.photoUrl !== undefined ? (
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
