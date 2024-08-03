"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export const Search = ({ placeholder }: { placeholder: string }) => {
  const [query, setQuery] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term.length > 0) {
      params.set("user", term);
    } else {
      params.delete("user");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex relative w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <form
        className="w-full max-w-5xl max-sm:w-[220px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
      >
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder || "Search"}
          onChange={(e) => setQuery(e.target.value)}
          defaultValue={searchParams.get("user")?.toString()}
        />
      </form>
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};
