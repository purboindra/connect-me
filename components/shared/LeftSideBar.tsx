"use client";

import { sidebarLinks } from "@/constants";
import { useDialog } from "@/hooks/useDialog";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <section className="left-0 top-0 sticky flex justify-between flex-col h-screen overflow-y-auto pl-8 pr-14 max-lg:pr-8 pt-8 pb-8 max-sm:hidden lg:w-[220px]">
      <div className="flex space-y-2 flex-col">
        <h1 className="text-xl font-semibold text-neutral-800 mb-8">
          Connect Me
        </h1>
        {sidebarLinks.map((item, index) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname == item.route;

          return (
            <Link
              href={item.route}
              key={index}
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
                  className={`max-lg:hidden text-base font-medium ${
                    isActive ? " text-neutral-700" : " text-neutral-700/40"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex space-x-4 hover:cursor-pointer">
        <Link
          href={"/profile"}
          className={`flex flex-col items-start justify-center py-1 px-2 `}
        >
          <div className="flex flex-row items-center space-x-2">
            <Image
              src={"/assets/icons/user.svg"}
              alt="Sidebar Icon"
              width={20}
              height={20}
              className="text-neutral-900"
            />
            <p
              className={`max-lg:hidden text-base font-medium  text-neutral-700`}
            >
              Profile
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};
