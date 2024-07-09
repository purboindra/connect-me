"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { CustomSheetContent } from "./CustomSheetContent";

const NavContent = () => {
  return (
    <section className="flex h-full flex-col gap-6 pt-8">
      <CustomSheetContent />
    </section>
  );
};

export const Navbar = () => {
  return (
    <nav className="max-sm:flex justify-between bg-neutral-100 fixed z-50 w-full py-3 px-8 shadow hidden">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base font-bold text-neutral-700">Connect Me</h1>
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
