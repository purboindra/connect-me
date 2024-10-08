"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

interface ModalInterface {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalInterface> = ({
  children,
  description,
  isOpen,
  onChange,
  title,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-800/70 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="mb-5 text-sm leading-normal text-center">
              {description}
            </Dialog.Description>
          )}
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="text-neutral-500 hover:text-neutral-800 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none ">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
