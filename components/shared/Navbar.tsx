"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-8">
      <h1 className="text-xl font-semibold text-neutral-800 mb-8">
        Connect Me
      </h1>
      {sidebarLinks.map((item, index) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname == item.route;

        return (
          <SheetClose key={item.route} asChild>
            <Link
              href={item.route}
              className={`flex flex-col items-start justify-center py-1 px-2 ${
                isActive && "rounded bg-neutral-400/10"
              }`}
            >
              <div className="flex flex-row items-center space-x-2">
                <Image
                  src={item.imgUrl}
                  alt="Sidebar Icon"
                  width={20}
                  height={20}
                  className={` ${
                    isActive ? "text-neutral-900" : "text-neutral-400"
                  }`}
                />
                <p
                  className={`text-base font-medium ${
                    isActive ? " text-neutral-700" : " text-neutral-700/40"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export const Navbar = () => {
  return (
    <nav className="max-sm:flex justify-between bg-neutral-100 fixed z-50 w-full py-3 px-8 shadow hidden">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-700">Logo</h1>
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
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
