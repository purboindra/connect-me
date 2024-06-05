"use server";

import { redirect } from "next/navigation";
import { RegisterSchema, RegisterState } from "../../lib/validation";
import { parseStringify } from "../../lib/utils";

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

    console.log(`${parseStringify(data)} -- ${response.status}`);

    if (response.status !== 200) throw new Error("Something went wrong");
  } catch (error) {
    console.error(error);
    throw error;
  }
  redirect("/");
}
