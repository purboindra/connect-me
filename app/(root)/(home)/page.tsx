import {
  BookMarkedIcon,
  Heart,
  MessageCircle,
  MoreHorizontal,
  ReplyAll,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const imgUrl =
  "https://images.unsplash.com/photo-1629374029669-aab2f060553b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function page() {
  return (
    <section className="flex flex-col items-center ">
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex py-4 flex-row gap-4 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (item) => (
              <div
                key={item}
                className="flex  flex-col gap-1 w-full items-center"
              >
                <div className="rounded-full h-[56px] w-[56px] p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  <div className=" bg-green-200 w-full h-full rounded-full" />
                </div>
                <p className="truncate w-[56px] flex">purboyndrsaa</p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col space-y-4 max-md:w-full w-[550px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="h-[36px] w-[36px] bg-green-200 rounded-full" />
              </div>
              <p className="font-semibold text-neutral-800">purboyndra</p>
              <p className="text-sm text-neutral-400">8h</p>
            </div>
            <MoreHorizontal
              size={24}
              className="text-neutral-500 hover:cursor-pointer"
            />
          </div>
          <div className="relative w-full h-[488px]">
            <Image
              src={imgUrl}
              alt="Post"
              fill
              objectFit="cover"
              className="object-top"
            />
          </div>
        </div>
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row gap-4">
            <Heart size={24} />
            <MessageCircle size={24} />
            <ReplyAll size={24} />
          </div>
          <div className="flex">
            <BookMarkedIcon size={24} />
          </div>
        </div>
        <p className="text-sm font-semibold text-neutral-800">2.032 likes</p>
      </div>
    </section>
  );
}
