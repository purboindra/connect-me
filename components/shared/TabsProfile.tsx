"use client";

import { PostInterface } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";
import PostGrid from "./PostGrid";
import Image from "next/image";
import { Grid } from "lucide-react";
import Reels from "./SavedPosts";
import Tag from "./Tag";
import SavedPosts from "./SavedPosts";

interface TabsProfileInterface {
  posts: PostInterface[];
}

const TabsProfile = ({ posts }: TabsProfileInterface) => {
  const [activeTab, setActiveTab] = React.useState("post");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section className="mt-4">
      <Tabs defaultValue={activeTab} orientation="vertical">
        <TabsList className=" flex justify-between w-full bg-transparent">
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
            value="save"
            className="shadow-none bg-transparent"
            onClick={() => handleTabChange("save")}
          >
            <Image
              src={`${
                activeTab === "save"
                  ? "/assets/icons/save.svg"
                  : "/assets/icons/save_unactive.svg"
              }`}
              alt="save"
              width={20}
              height={20}
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
        <TabsContent value="save">
          <SavedPosts />
        </TabsContent>
        <TabsContent value="tag">
          <Tag />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabsProfile;
