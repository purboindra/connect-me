"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-full flex items-center justify-center mx-auto flex-col gap-2">
      <h2>{`${error.name}`}</h2>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
