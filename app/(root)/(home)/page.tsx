import { fetchAllPost } from "@/app/actions/post.action";
import { fetchAllUser, getCurrentUser } from "@/app/actions/user.action";
import { dynamicToPostInterface } from "@/lib/utils";
import { PostInterface } from "@/types";
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

export default async function page() {
  const users = await fetchAllUser();
  const posts = await fetchAllPost();

  return (
    <section className="flex flex-col items-center">
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex py-4 flex-row gap-4 ">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col gap-1">
              <div className="rounded-full h-[56px] w-[56px] p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className=" bg-neutral-300 w-full h-full rounded-full">
                  <Image
                    src={"/assets/icons/account.svg"}
                    alt="profile"
                    width={300}
                    height={300}
                    className="text-neutral-600 object-cover"
                  />
                </div>
              </div>
              <p className="truncate w-[56px] flex">{user.username}</p>
            </div>
          ))}
        </div>
      </div>
      {/* FEED */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="mt-8 flex flex-col space-y-4 max-md:w-full w-[550px]"
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <div className="rounded-full p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  <div className="h-[36px] w-[36px] bg-neutral-300 rounded-full">
                    {post.author.photoUrl !== undefined ? (
                      <Image
                        src={post.author.photoUrl}
                        alt="profile"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Image
                        src={"/assets/icons/account.svg"}
                        alt="profile"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                </div>
                <p className="font-semibold text-neutral-800">
                  {post.author.username}
                </p>
                <p className="text-sm text-neutral-400">8h</p>
              </div>
              <MoreHorizontal
                size={24}
                className="text-neutral-500 hover:cursor-pointer"
              />
            </div>
            <div className="relative w-full h-[488px]">
              {post.imageUrl !== null ? (
                <Image
                  src={post.imageUrl}
                  alt="Post"
                  fill
                  objectFit="cover"
                  className="object-top"
                />
              ) : (
                <div className="h-full w-full bg-neutral-300">
                  <p className="text-center flex items-center justify-center h-full text-neutral-600">
                    No Image
                  </p>
                </div>
              )}
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
      ))}
    </section>
  );
}
