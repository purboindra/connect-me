import { fetchAllPost } from "@/app/actions/post.action";
import { fetchUserByUsername, getCurrentUser } from "@/app/actions/user.action";
import { FeedItem } from "@/components/shared/FeedItem";
import { Search } from "@/components/shared/Search";
import { SearchParamsProps, UserInterface } from "@/types";
import Image from "next/image";
import React from "react";

export default async function page({ searchParams }: SearchParamsProps) {
  const query = searchParams?.user || "";

  const users = await fetchUserByUsername({ username: query });

  const [posts, currentUser] = await Promise.all([
    fetchAllPost(),
    getCurrentUser(),
  ]);

  return (
    <section className="flex flex-col items-center max-sm:pt-8">
      {/* FEED */}
      <Search placeholder={query} />
      {users !== undefined ? (
        users.map((user) => <p key={user.id}>{user.username}</p>)
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}
