"use client";

import { LoginForm } from "@/components/shared/LoginForm";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <main className="max-w-5xl h-screen mx-auto flex flex-col py-14 px-12 items-center justify-center">
      <h1 className="text-lg max-sm:text-base font-semibold text-neutral-800">
        Hello, welcome back!
      </h1>
      <p className="text-neutral-800 max-sm:w-48 truncate max-md:text-base">
        Sign in again to enjoy Connect Me!
      </p>
      <div className="w-1/2 mt-6">
        <LoginForm />
      </div>
      <p className="mt-4 text-neutral-400 text-sm text-center">
        Haven&apos;t an account?{" "}
        <Link href={"/register"}>
          <span className="text-neutral-700">Sign Up</span>
        </Link>
      </p>
    </main>
  );
}
