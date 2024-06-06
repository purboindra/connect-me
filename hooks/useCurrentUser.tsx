import { getCurrentUser } from "@/app/actions/auth.action";
import { useState, useEffect } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();

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

  return { user, loading, error };
}
