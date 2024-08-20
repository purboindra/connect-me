import { fetchAllPost } from "@/app/actions/post.action";
import { fetchUserByUsername, getCurrentUser } from "@/app/actions/user.action";
import { FeedItem } from "@/components/shared/FeedItem";
import { Search } from "@/components/shared/Search";
import { UserCard } from "@/components/shared/UserCard";
import { PostInterface, SearchParamsProps } from "@/types";
import Image from "next/image";
import React from "react";

export default async function page({ searchParams }: SearchParamsProps) {
  const query = searchParams?.user || "";

  let users = undefined;
  let posts: PostInterface[] = [];
  let currentUser = undefined;

  if (query) {
    users = await fetchUserByUsername({ username: query });
  } else {
    [posts, currentUser] = await Promise.all([
      fetchAllPost(),
      getCurrentUser(),
    ]);
  }

  return (
    <section className="flex flex-col items-center max-sm:pt-8">
      {/* FEED */}
      {/* <Search placeholder={query} /> */}
      {/* CONDITIO FETCH USER FROM SEARCH */}
      {users !== undefined ? (
        users.length > 0 ? (
          users!.map((user) => <UserCard user={user} key={user.id} />)
        ) : (
          <div className="flex mt-8 flex-col space-y-2 mx-auto items-center justify-center">
            <h2>No users found</h2>
            <Image
              src={"/assets/icons/account.svg"}
              alt="Post"
              width={500}
              height={500}
              className="w-24 h-24 invert"
            />
          </div>
        )
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
