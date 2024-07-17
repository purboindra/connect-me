"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { LeftSidebarSheet } from "./LeftSidebarSheet";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { AvatarEnum } from "@/lib/enums";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { logout } from "@/app/actions/auth.action";

interface NavContentInterface {
  user: any;
}

const NavContent = ({ user }: NavContentInterface) => {
  return (
    <section className="flex h-full flex-col gap-6 pt-8">
      <LeftSidebarSheet user={user} />
    </section>
  );
};

export const Navbar = ({ user }: NavContentInterface) => {
  const pathname = usePathname();

  const isProfile = pathname.startsWith("/profile");

  return (
    <nav className="max-sm:flex justify-between bg-neutral-50 fixed z-50 w-full py-3 px-8 shadow hidden">
      <div className="flex w-full items-center justify-between">
        <h1
          className={`text-base font-bold text-neutral-700 ${
            isProfile && "hidden"
          }`}
        >
          Connect Me
        </h1>
        <div className={`${!isProfile ? "hidden" : "flex"}`}>
          <Dialog>
            <DialogTrigger>
              <Avatar type={AvatarEnum.User} user={user} />
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col p-8 items-center mx-auto">
                <form action={logout}>
                  <Button>Logout</Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-row space-x-6 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Image
                src={"/assets/icons/hamburger.svg"}
                alt="Hamburger"
                width={24}
                height={24}
                className="invert"
              />
            </SheetTrigger>
            <SheetContent side={"left"} className="bg-neutral-100 border-none">
              <NavContent user={user} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
