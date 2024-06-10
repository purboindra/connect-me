"use client";

import { getCurrentUser } from "@/app/actions/auth.action";
import { UserInterface } from "@/types";
import { useState, useEffect } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<null | UserInterface>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        console.log("response", response);
        setUser(response);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error, setUser };
}
