import { logout } from "@/app/actions/auth.action";
import { fetchPostByUserid } from "@/app/actions/post.action";
import { getCurrentUser } from "@/app/actions/user.action";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function page() {
  const user = await getCurrentUser();

  const posts = await fetchPostByUserid({
    userId: user.id,
  });

  return (
    <section className="h-screen max-w-5xl flex mx-auto justify-center items-center">
      <form action={logout}>
        <Button>Logout</Button>
        {posts.map((post: any) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </form>
    </section>
  );
}
