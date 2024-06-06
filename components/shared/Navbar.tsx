import React from "react";

export const Navbar = () => {
  return (
    <nav className="md:flex justify-between bg-neutral-100 fixed z-50 w-full p-6 shadow hidden">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-700">Logo</h1>
        <div className="flex space-x-2">
          <h1>Hello</h1>
        </div>
      </div>
    </nav>
  );
};
