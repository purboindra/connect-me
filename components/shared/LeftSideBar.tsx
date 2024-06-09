"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <section className="left-0 top-0 sticky flex justify-between flex-col h-screen overflow-y-auto border-r pl-2 pr-14 max-lg:pr-8 pt-28 pb-8 max-sm:hidden lg:w-[200px] ">
      <div className="flex space-y-8 flex-col">
        {sidebarLinks.map((item, index) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname == item.route;

          return (
            <Link
              href={item.route}
              key={index}
              className="flex space-x-4 items-center justify-start"
            >
              <Image
                src={item.imgUrl}
                alt="Sidebar Icon"
                width={20}
                height={20}
                className={`${isActive ? "" : "invert"}`}
                aria-hidden="true"
              />
              <p
                className={`max-lg:hidden text-base font-semibold ${
                  isActive ? " text-neutral-700" : " text-neutral-700/40"
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="flex space-x-4 hover:cursor-pointer">
        <Image
          src={"/assets/icons/mingcute-down-line.svg"}
          alt="Sidebar Icon"
          width={20}
          height={20}
          className="invert"
        />
        <p className="text-base font-semibold text-neutral-700 max-lg:hidden">
          More
        </p>
      </div>
    </section>
  );
};
