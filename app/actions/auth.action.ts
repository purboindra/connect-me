"use server";

import { redirect } from "next/navigation";
import {
  LoginSchema,
  LoginState,
  RegisterSchema,
  RegisterState,
} from "../../lib/validation";
import { addTimestampToError, verifyToken } from "../../lib/utils";
import { cookies } from "next/headers";

export async function register(prevState: RegisterState, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const email = validatedFields.data.email;
    const password = validatedFields.data.password;
    const username = validatedFields.data.username;

    const response = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status !== 201) throw new Error(`${data.message}`);

    const userData = verifyToken(data.data.access_token);

    const userId = (userData as any).userId;

    cookies().set("user_id", userId);
    cookies().set("access_token", data.data.access_token);
    cookies().set("refresh_token", data.data.refresh_token);
  } catch (error: any) {
    console.error(error);
    return {
      errors: addTimestampToError({
        errors: error.message,
      }),
    };
  }
  redirect("/");
}

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const email = validatedFields.data.email;
    const password = validatedFields.data.password;

    const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status !== 201) throw new Error(`${data.message}`);

    cookies().set("access_token", data.data.token);
    cookies().set("refresh_token", data.data.refreshToken);
    cookies().set("user_id", data.data.id);
  } catch (error: any) {
    console.error(error);
    return {
      errors: addTimestampToError({
        errors: error.message,
      }),
    };
  }
  redirect("/");
}

export async function logout() {
  try {
    cookies().delete("access_token");
    cookies().delete("user_id");
    cookies().delete("refresh_token");
  } catch (error) {
    console.error(error);
    throw error;
  }
  redirect("/login");
}

export async function refreshToken() {
  const refreshToken = cookies().get("refresh_token");
  const token = cookies().get("access_token");

  if (!refreshToken || !token) return null;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        body: JSON.stringify({
          refhreshToken: refreshToken.value,
        }),
        headers: {
          Authorization: token.value,
        },
      }
    );

    const data = await response.json();

    console.log(`response refreshToken action: ${data}`);

    if (data.status !== 201) return null;

    cookies().set("access_token", data.data.accessToken);
    cookies().set("refresh_token", data.data.refreshToken);

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
