import { LeftSideBar } from "@/components/shared/LeftSideBar";
import { Navbar } from "@/components/shared/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="max-w-5xl mx-auto w-full">{children}</div>
        </section>
        Right Sidebar
      </div>
    </main>
  );
}
