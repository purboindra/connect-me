import { isTokenExpired, parseStringify } from "@/lib/utils";
import { UserInterface } from "@/types";
import { cookies } from "next/headers";

export async function getAllUser() {
  let users: UserInterface[] = [];

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/user/get-all-user`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    const currentUser = await getCurrentUser();

    const filteredUsers = data.data.filter(
      (user: any) => user.id !== currentUser.id
    );

    for (const user of filteredUsers) {
      users.push(parseStringify(user));
    }

    return users;
  } catch (error) {
    console.log("ERROR GET ALL USER", error);
    throw error;
  }
}

export async function getCurrentUser() {
  let token = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;

  if (!token || !refreshToken) return null;

  if (isTokenExpired(token)) {
    const respRefresh = await fetch(
      `${process.env.BASE_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        body: JSON.stringify({
          refreshToken,
        }),
      }
    );

    if (respRefresh.status !== 201) throw new Error("Failed refresh token");

    const dataRefresh = await respRefresh.json();

    console.log(dataRefresh);
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/user/get-user`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (data.status !== 200) return null;

    return parseStringify(data.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
