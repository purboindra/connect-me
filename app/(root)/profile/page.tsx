import { logout } from "@/app/actions/auth.action";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <section className="h-screen max-w-5xl flex mx-auto justify-center items-center">
      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </section>
  );
}
