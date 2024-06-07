"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/app/actions/auth.action";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const { user, loading, error, setUser } = useCurrentUser();

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav className="md:flex justify-between bg-neutral-100 fixed z-50 w-full p-6 shadow hidden">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-700">Logo</h1>
        <div className="flex flex-row space-x-3 items-center">
          {user ? (
            <div className="flex space-x-3 items-center">
              <div className="flex space-x-2">
                <h1>Hello</h1>
                <p>{user?.username}</p>
              </div>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
};
