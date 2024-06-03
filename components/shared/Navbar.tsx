import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex justify-between bg-neutral-100 fixed z-50 w-full p-6 shadow">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold text-neutral-700">Logo</h1>
      </div>
    </nav>
  );
};
