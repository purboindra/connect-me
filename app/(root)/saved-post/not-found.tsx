import { EmptyContent } from "@/components/shared/EmptyContent";
import React from "react";

export default function NotFound() {
  return (
    <section className="flex flex-col max-w-5xl mx-auto">
      <h1 className="text-3xl max-sm:text-lg font-bold text-neutral-800">
        Saved Post
      </h1>
      <EmptyContent
        title={"No post saved"}
        imageUrl={"/assets/icons/video.svg"}
      />
    </section>
  );
}
