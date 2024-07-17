"use client";

import { PostInterface } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";
import PostGrid from "./PostGrid";
import Image from "next/image";
import { Grid } from "lucide-react";

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
    </section>
  );
};

export default TabsProfile;
