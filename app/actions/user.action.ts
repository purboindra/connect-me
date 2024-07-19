import { isTokenExpired, parseStringify } from "@/lib/utils";
import { EditProfileSchema, EditUserState } from "@/lib/validation";
import { UserInterface } from "@/types";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

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

export async function editUser(prevState: EditUserState, formData: FormData) {
  const cookiesStore = cookies();

  const token = cookiesStore.get("token");

  if (!token) throw new Error("Unauthorized");

  const validatedFields = EditProfileSchema.safeParse({
    username: formData.get("username"),
    bio: formData.get("bio"),
    image_url: formData.get("image_url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const bio = validatedFields.data.bio;
    const username = validatedFields.data.username;

    const response = await fetch(`${process.env.BASE_URL}/api/user/edit`, {
      method: "PUT",
      body: JSON.stringify({ bio: bio, username: username }),
    });

    if (response.status !== 200) throw new Error(response.statusText);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        errors: error.message,
      };
    } else {
      return {
        errors: "An error unexcepted occured",
      };
    }
  }
}
