"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import { X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

export function FollowModal() {
  const { isOpen, onClose } = useDialog();

  return (
    <Dialog open={isOpen} modal defaultOpen={isOpen}>
      {/* <DialogClose> 
        <X
          className="ml-2 h-4 w-4"
          onClick={() => {
            onClose();
          }}
        />
      </DialogClose> */}
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col gap-8 px-4 py-2">Hello World</div>
      </DialogContent>
    </Dialog>
  );
}
