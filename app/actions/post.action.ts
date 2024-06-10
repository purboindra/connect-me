"use server";

import { CreatePostSchema, CreatePostState } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createPost(
  prevState: CreatePostState,
  formData: FormData
) {
  const token = cookies().get("access_token")?.value;

  if (!token) throw new Error("Invalid token");

  const validateFields = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const title = validateFields.data.title;
  const content = validateFields.data.content;

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/post/create`, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (data.status !== 201) throw new Error("Failed creating post");
  } catch (error) {
    console.error("Error create post", error);
    throw error;
  }

  revalidatePath("/");
  redirect("/");
}
