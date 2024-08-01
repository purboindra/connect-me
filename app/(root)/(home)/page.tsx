import { fetchAllPost } from "@/app/actions/post.action";
import { getCurrentUser } from "@/app/actions/user.action";
import { FeedItem } from "@/components/shared/FeedItem";
import Image from "next/image";
import React from "react";

export default async function page() {
  const [posts, currentUser] = await Promise.all([
    fetchAllPost(),
    getCurrentUser(),
  ]);

  return (
    <section className="flex flex-col items-center">
      {/* <div className="w-full overflow-auto no-scrollbar"> */}
      {/* <div className="flex py-4 flex-row gap-4 "> */}
      {/* {follows.map((user: any) => (
            <div key={user.followedUserId} className="flex flex-col gap-1">
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
              <p className="truncate w-[56px] flex">{user.follower.username}</p>
            </div>
          ))} */}
      {/* </div> */}
      {/* </div> */}
      {/* FEED */}
      {posts.length > 0 ? (
        <FeedItem posts={posts} user={currentUser} />
      ) : (
        <div className="flex flex-col space-y-2 mx-auto items-center justify-center">
          <h2>No posts or users found</h2>
          <Image
            src={"/assets/icons/video.svg"}
            alt="Post"
            width={500}
            height={500}
            className="w-24 h-24 invert"
          />
        </div>
      )}
    </section>
  );
}
