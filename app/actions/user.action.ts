"use server";

import { isTokenExpired, parseStringify } from "../../lib/utils";
import { EditProfileSchema, EditUserState } from "../../lib/validation";
import { UserInterface } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FetchUserByIdParams, FetchUserByUsernameParams } from "./shared.types";

export async function fetchAllUser() {
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

    if (currentUser) {
      const filteredUsers = data.data.filter(
        (user: any) => user.id !== currentUser.id
      );

      for (const user of filteredUsers) {
        users.push(parseStringify(user));
      }
    } else {
      for (const user of data.data) {
        users.push(parseStringify(user));
      }
    }

    return users;
  } catch (error) {
    console.log("ERROR GET ALL USER", error);
    throw error;
  }
}

export async function fetchSuggestedUser() {
  let users: UserInterface[] = [];

  const token = cookies().get("access_token");

  if (!token) return users;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/user/get-suggested-user`,
      {
        method: "GET",
        headers: {
          Authorization: token.value,
        },
      }
    );

    const data = await response.json();

    for (const user of data.data) {
      users.push(parseStringify(user));
    }

    return users;
  } catch (error) {
    console.log("ERROR GET ALL USER", error);
    throw error;
  }
}

export async function fetchUserById(params: FetchUserByIdParams) {
  console.log(params.userId);

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/user/${params.userId}`
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) throw new Error(`${data.message}`);

    return parseStringify(data);
  } catch (error) {
    console.log(error);
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
    return null;
  }
}

export async function editProfile(
  userId: string,
  prevState: EditUserState,
  formData: FormData
) {
  const cookiesStore = cookies();

  const token = cookiesStore.get("access_token");

  if (!token) throw new Error("Unauthorized");

  const validatedFields = EditProfileSchema.safeParse({
    username: formData.get("username"),
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const bio = validatedFields.data.bio;
  const username = validatedFields.data.username;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/user/edit/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.value,
        },

        body: JSON.stringify({
          bio,
          username,
        }),
      }
    );

    const data = await response.json();

    if (data.status !== 200) throw new Error(`${data.message}`);
  } catch (error: any) {
    console.log("Error edit user", error);
    return {
      errors: error.message,
    };
  }
  revalidatePath(`/profile/${userId}`);
  redirect(`/profile/${userId}`);
}

export async function deleteFollow(formData: FormData) {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const userId = formData.get("userId");

    if (!userId) throw new Error("Invalid post");

    const response = await fetch(
      `${process.env.BASE_URL}/api/user/follow/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ userId: userId }),
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.status !== 200) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("Error createFollow", error);
    throw error;
  }
  revalidatePath("/");
}

export async function createFollow(formData: FormData) {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const userId = formData.get("userId");

    if (!userId) throw new Error("Invalid post");

    const response = await fetch(
      `${process.env.BASE_URL}/api/user/follow/create`,
      {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.status !== 200) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("Error createFollow", error);
    throw error;
  }
  revalidatePath("/");
}

export async function fetchFollow() {
  const token = cookies().get("access_token");

  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/user/follow`, {
      method: "GET",
      headers: {
        Authorization: token.value,
      },
    });

    const data = await response.json();

    if (response.status !== 200) throw new Error(`${data.message}`);

    console.log(data);

    return parseStringify(data.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchUserByUsername(params: FetchUserByUsernameParams) {
  if (params.username.length === 0) return;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/user/get-all/${params.username}`
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) throw new Error(`${data.message}`);

    return data.data as UserInterface[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
