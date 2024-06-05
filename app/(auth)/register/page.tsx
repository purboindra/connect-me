import { RegisterForm } from "@/components/shared/RegisterForm";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <main className="max-w-5xl h-screen mx-auto flex py-14 px-12 items-center justify-center">
      <div className="flex w-full flex-row gap-4">
        <div className=" flex flex-col gap-1 max-md:hidden justify-center">
          <h1 className="text-lg font-semibold text-neutral-700">Hello,</h1>
          <p className="text-lg font-medium text-neutral-700">
            Welcome to connect me
          </p>
        </div>
        <div className="flex flex-1 flex-col p-8 border border-neutral-300">
          <h1 className="text-3xl max-sm:text-lg font-semibold text-neutral-800 text-center">
            Connect Me
          </h1>
          <RegisterForm />
          <p className="text-base">
            Have an account?
            <Link href={"/login"}>
              <span className="text-blue-500 font-bold"> Sign In </span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
