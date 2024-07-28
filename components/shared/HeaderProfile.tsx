"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PostInterface, UserInterface } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { logout } from "@/app/actions/auth.action";

interface HeaderProfileInterface {
  user: UserInterface;
  currentUserId: string;
}

const HeaderProfile = ({ user, currentUserId }: HeaderProfileInterface) => {
  return (
    <header className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4 items-center">
        <div className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="h-12 w-12 bg-neutral-300 rounded-full">
            {user.photoUrl !== undefined ? (
              <Image
                src={user.photoUrl}
                alt="profile"
                width={100}
                height={100}
              />
            ) : (
              <Image
                src={"/assets/icons/account.svg"}
                alt="profile"
                width={100}
                height={100}
              />
            )}
          </div>
        </div>
        {currentUserId === user.id && (
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-neutral-700">
              {user.username}
            </h2>
            <div className="flex flex-row space-x-2">
              <Link href={`/profile/${user.id}/edit`}>
                <Button>Edit Profile</Button>
              </Link>
              <form action={logout}>
                <Button>Logout</Button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col ">
        <h2 className="text-base font-semibold text-neutral-700">
          {user.username}
        </h2>

        <p className="text-sm text-neutral-500">{user.bio}</p>
      </div>
    </header>
  );
};

export default HeaderProfile;
