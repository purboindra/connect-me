"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PostInterface, UserInterface } from "@/types";
import { Button } from "../ui/button";
import { Grid, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PostGrid from "./PostGrid";

interface HeaderProfileInterface {
  user: UserInterface;
  posts: PostInterface[];
}

const HeaderProfile = ({ user, posts }: HeaderProfileInterface) => {
  const [activeTab, setActiveTab] = useState("post");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <header className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4 items-center">
        <div className="rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="h-12 w-12 bg-neutral-300 rounded-full">
            {user.photoUrl !== undefined ? (
              <Image
                src={user.photoUrl}
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
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-neutral-700">
            {user.username}
          </h2>
          <div className="flex flex-row space-x-2">
            <Button>Edit Profile</Button>
            <Button>View Archive</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <h2 className="text-base font-semibold text-neutral-700">
          {user.username}
        </h2>

        <p className="text-sm text-neutral-500">{user.bio}</p>
      </div>

      {/* HIGHLIGHT */}

      <div className="mt-2 flex flex-col gap-1 w-full">
        <div className="flex flex-col w-fit items-center gap-1">
          <div className="h-16 w-16 rounded-full items-center flex bg-neutral-600">
            <div className="flex items-center mx-auto justify-center">
              <Plus size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-base">New</h2>
        </div>
        <div className="h-[1px] bg-neutral-400 w-full" />
      </div>

      {/* STATS */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between w-full py-4">
          <div className="flex flex-col gap-[1px] items-center">
            <h2 className="text-base font-semibold">{posts.length}</h2>
            <p className="text-sm font-mono text-neutral-700">posts</p>
          </div>
          <div className="flex flex-col gap-[1px] items-center">
            <h2 className="text-base font-semibold">
              {user.followers?.length || 0}
            </h2>
            <p className="text-sm font-mono text-neutral-700">followers</p>
          </div>
          <div className="flex flex-col gap-[1px] items-center">
            <h2 className="text-base font-semibold">
              {user.following?.length || 0}
            </h2>
            <p className="text-sm font-mono text-neutral-700">following</p>
          </div>
        </div>
        <div className="h-[1px] bg-neutral-400 w-full" />
      </div>

      {/* POST */}
      <Tabs defaultValue={activeTab} orientation="vertical">
        <TabsList className="grid w-full grid-cols-3 bg-transparent">
          <TabsTrigger
            value="post"
            className="shadow-none bg-transparent"
            onClick={() => handleTabChange("post")}
          >
            <Grid
              size={28}
              className={`${
                activeTab === "post" ? "text-neutral-800" : "text-neutral-300"
              }`}
            />
          </TabsTrigger>
          <TabsTrigger
            value="video"
            className="shadow-none bg-transparent"
            onClick={() => handleTabChange("video")}
          >
            <Image
              src={"/assets/icons/video.svg"}
              alt="video"
              width={24}
              height={24}
              className={`${activeTab === "video" && "invert"}`}
            />
          </TabsTrigger>
          <TabsTrigger
            value="tag"
            className="shadow-none bg-transparent"
            onClick={() => handleTabChange("tag")}
          >
            <Image
              src={"/assets/icons/tag.svg"}
              alt="tag"
              width={24}
              height={24}
              className={`${activeTab === "tag" && "invert"}`}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="post">
          <PostGrid posts={posts} />
        </TabsContent>
        <TabsContent value="video">
          <h2>Hello video</h2>
        </TabsContent>
        <TabsContent value="tag">
          <h2>Hello tag</h2>
        </TabsContent>
      </Tabs>
    </header>
  );
};

export default HeaderProfile;
