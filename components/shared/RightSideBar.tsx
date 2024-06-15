"use client";

import { suggestedPeoples } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const RightSideBar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="pr-8 pt-24 flex sticky top-0 right-0 h-screen overflow-y-auto flex-col space-y-8 max-w-[300px] w-full max-lg:hidden">
      <div className="p-[24px] border w-full  rounded-md border-neutral-400 h-fit">
        <h2 className="text-base font-medium text-neutral-700 mb-8">
          Suggested people
        </h2>
        {mounted && (
          <>
            {suggestedPeoples.map((person) => {
              return (
                <Link
                  href={"/profile"}
                  key={person.id}
                  className="flex space-x-2 items-center mb-4"
                >
                  <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                    <Image
                      alt={person.name}
                      src={person.photoUrl}
                      width={48}
                      height={48}
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-medium text-neutral-800">
                      {person.name}
                    </p>
                    <p className="text-base text-neutral-500">
                      {person.username}
                    </p>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
      <div className="p-[24px] border w-full  rounded-md border-neutral-400 h-fit">
        <h2 className="text-base font-medium text-neutral-700 mb-8">
          Communities you might like
        </h2>
        {mounted && (
          <>
            {suggestedPeoples.map((person) => {
              return (
                <Link
                  href={"/profile"}
                  key={person.id}
                  className="flex space-x-2 items-center mb-4"
                >
                  <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                    <Image
                      alt={person.name}
                      src={person.photoUrl}
                      width={48}
                      height={48}
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-medium text-neutral-800">
                      {person.name}
                    </p>
                    <p className="text-base text-neutral-500">
                      {person.username}
                    </p>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};
