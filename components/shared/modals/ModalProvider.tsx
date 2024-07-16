"use client";

import React from "react";
import { CommentModal } from "./CommentModal";
import { useDialog } from "@/hooks/useDialog";
import { DialogEnum } from "@/lib/enums";

export const ModalProvider = () => {
  const { type } = useDialog();

  return <>{type === DialogEnum.Feed && <CommentModal />}</>;
};
