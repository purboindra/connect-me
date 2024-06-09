"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";
import { ArrowRightIcon } from "lucide-react";
import { LoginForm } from "@/components/shared/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <main className="max-w-5xl w-1/2 flex flex-col gap-2 h-screen items-center justify-center mx-auto py-14 px-12">
      <h1 className="text-3xl max-sm:text-lg font-semibold text-neutral-700">
        Hello, welcome back!
      </h1>
      <div className="p-4 border border-neutral-300 w-full ">
        <LoginForm />
      </div>
      <p className="text-base">
        Don&apos;t have an account?
        <Link href={"/register"}>
          <span className="text-blue-500 font-bold"> Sign Up </span>
        </Link>
      </p>
    </main>
  );
}
