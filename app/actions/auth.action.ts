"use server";

import { redirect } from "next/navigation";
import {
  LoginSchema,
  LoginState,
  RegisterSchema,
  RegisterState,
} from "../../lib/validation";
import { parseStringify, verifyToken } from "../../lib/utils";
import { cookies } from "next/headers";

export async function register(prevState: RegisterState, formData: FormData) {
  console.log("REGISTER CALLED");

  const validatedFields = RegisterSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  console.log(validatedFields.success);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const email = validatedFields.data.email;
    const password = validatedFields.data.password;
    const username = validatedFields.data.username;

    console.log(email);

    const response = await fetch("http://localhost:3000/api/auth/register", {
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

    if (data.status !== 201) throw new Error(`${data.message}`);

    cookies().set("token", data.token);

    const userData = verifyToken(data.token);

    const userId = (userData as any).userId;

    cookies().set("user_id", userId);
  } catch (error) {
    console.error(error);
    throw error;
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

    const response = await fetch("http://localhost:3000/api/auth/login", {
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

    console.log(data);

    cookies().set("token", data.data.tokens[0].token);
    cookies().set("user_id", data.data.id);
    cookies().set("username", data.data.username);
    cookies().set("email", data.data.email);
  } catch (error) {
    console.error(error);
    throw error;
  }
  redirect("/");
}
