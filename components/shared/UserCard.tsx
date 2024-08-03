import { UserInterface } from "@/types";
import React from "react";
import Avatar from "./Avatar";
import { AvatarEnum } from "@/lib/enums";
import Link from "next/link";

interface UserCardInterface {
  user: UserInterface;
}

export const UserCard = ({ user }: UserCardInterface) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex w-full items-start justify-start py-2 flex-row"
    >
      <Avatar type={AvatarEnum.User} user={user} />
    </Link>
  );
};
