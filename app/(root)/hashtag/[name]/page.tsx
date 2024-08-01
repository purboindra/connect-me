import { fetchPostByHashtag } from "@/app/actions/post.action";
import { EmptyContent } from "@/components/shared/EmptyContent";
import ImageGrid from "@/components/shared/ImageGrid";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { name: string } }) {
  const post = await fetchPostByHashtag({ name: params.name });

  return (
    <section className="flex flex-col max-w-5xl mx-auto">
      <h1 className="text-3xl max-sm:text-lg font-bold text-neutral-800">
        #{params.name}
      </h1>
      <div className="grid grid-cols-5 mt-4 max-sm:grid-cols-3 gap-2">
        {post.length === 0 ? (
          <EmptyContent
            title={"No post found"}
            imageUrl={"/assets/icons/video.svg"}
          />
        ) : (
          <>
            {post.map((post: any) => (
              <div key={post.id} className="max-sm:h-[155px] h-full">
                <Link href={`/post/${post.id}`}>
                  <ImageGrid imageUrl={post.imageUrl || ""} />
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
