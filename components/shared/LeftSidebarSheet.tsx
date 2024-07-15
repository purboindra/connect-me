"use client";

import React from "react";
import { SheetClose } from "../ui/sheet";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";

interface LeftSidebarSheetInterface {
  user: any;
}

export const LeftSidebarSheet = ({ user }: LeftSidebarSheetInterface) => {
  const pathname = usePathname();

  const router = useRouter();

  return (
    <>
      <SheetClose className="flex" asChild>
        <Link href={"/"} className="hover:cursor-pointer">
          <h1 className="text-xl font-semibold text-neutral-800 mb-8">
            Connect Me
          </h1>
        </Link>
      </SheetClose>
      <div className="flex flex-col h-full gap-3">
        {user && (
          <>
            {sidebarLinks.map((item) => {
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
                          isActive
                            ? " text-neutral-700"
                            : " text-neutral-700/40"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                  </Link>
                </SheetClose>
              );
            })}
          </>
        )}
        {user ? (
          <SheetClose asChild>
            <div className="flex items-end h-full">
              <div className="space-x-4 border-none outline-none focus:outline-none">
                <Link
                  href={"/profile"}
                  className={`flex flex-col items-start justify-center py-1 px-2`}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Image
                      src={"/assets/icons/user.svg"}
                      alt="Sidebar Icon"
                      width={20}
                      height={20}
                      className="text-neutral-900"
                    />
                    <p className={`text-base font-medium  text-neutral-700/40`}>
                      Profile
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </SheetClose>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </>
  );
};
