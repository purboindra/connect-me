import { LeftSideBar } from "@/components/shared/LeftSideBar";
import { Navbar } from "@/components/shared/Navbar";
import { RightSideBar } from "@/components/shared/RightSideBar";
import React from "react";
import { getCurrentUser } from "../actions/user.action";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <LeftSideBar user={currentUser} />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-8 overflow-x-auto">
          <div className="max-w-5xl mx-auto w-full">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
}
