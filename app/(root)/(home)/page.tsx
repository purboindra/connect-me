import { fetchAllPost } from "@/app/actions/post.action";
import { fetchAllUser, getCurrentUser } from "@/app/actions/user.action";
import { FeedItem } from "@/components/shared/FeedItem";
import Image from "next/image";
import React from "react";

export default async function page() {
  const users = await fetchAllUser();
  const posts = await fetchAllPost();

  const currentUser = await getCurrentUser();

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
      <FeedItem posts={posts} user={currentUser} />
    </section>
  );
}
