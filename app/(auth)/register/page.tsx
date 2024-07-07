import { RegisterForm } from "@/components/shared/RegisterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <main className="max-w-5xl h-screen mx-auto flex flex-col py-14 px-12 items-center justify-center">
      <h1 className="text-lg max-sm:text-base font-semibold text-neutral-800">
        Create an account
      </h1>
      <p className="text-neutral-800 max-sm:w-48 truncate max-md:text-base">
        Enter your email and password to sign up for this app
      </p>
      <div className="w-1/2 mt-6">
        <RegisterForm />
      </div>
      <div className="mt-4 flex w-1/2 items-center flex-col space-y-2">
        <p className="font-semibold text-neutral-800">OR</p>
        <Link href={"/login"} className="w-full">
          <Button className="w-full" variant={"outline"}>
            Sign In
          </Button>
        </Link>
      </div>
      <p className="mt-4 text-neutral-400 text-sm text-center">
        By clicking Sign Up, you agree to our <br />{" "}
        <span className="text-neutral-700">Terms of Service</span> and{" "}
        <span className="text-neutral-700">Privacy Policy</span>
      </p>
    </main>
  );
}
