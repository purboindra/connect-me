"use client";

import Post from "@/app/(root)/create/page";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import { X } from "lucide-react";
import { PostItem } from "../PostItem";
import { InteractionItem } from "../InteractionItem";
import { LikeInterface } from "@/types";
import { DialogClose } from "@radix-ui/react-dialog";

export function CommentModal() {
  const { isOpen, data, onClose } = useDialog();

  const hasLiked =
    data.user &&
    data.post.likes.find(
      (like: LikeInterface) =>
        like.userId.toString() === data.user.id.toString()
    ) !== undefined;

  const hasSaved =
    data.user &&
    data.post.likes.find(
      (like: LikeInterface) =>
        like.userId.toString() === data.user.id.toString()
    ) !== undefined;

  return (
    <Dialog open={isOpen} modal defaultOpen={isOpen}>
      <DialogClose>
        <Button variant="outline" className="rounded">
          <X className="ml-2 h-4 w-4" />
        </Button>
      </DialogClose>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col gap-8 px-4 py-2">
          <PostItem post={data.post} user={data} />
          <InteractionItem
            postId={data.post.id.toString()}
            initialLike={{
              hasLike: hasLiked,
              likeCount: data.post.likes.length,
            }}
            hasSaved={hasSaved}
            hasLiked={hasLiked}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
