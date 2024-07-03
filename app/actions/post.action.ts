"use server";

import { CreatePostSchema, CreatePostState } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createPost(
  prevState: CreatePostState,
  formData: FormData
) {
  const token = cookies().get("access_token")?.value;
  const supabase = createClient();

  if (!token) throw new Error("Invalid token");

  try {
    const validateFields = CreatePostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      imageUrl: formData.get("imageUrl"),
    });

    if (!validateFields.success) {
      console.log("ERROR VALIDATE", validateFields.error.flatten().fieldErrors);
      return {
        errors: validateFields.error.flatten().fieldErrors,
      };
    }

    const title = validateFields.data.title;
    const content = validateFields.data.content;
    const imageUrl = validateFields.data.imageUrl;

    const fileName = `${Date.now()}_${imageUrl.name}`;

    console.log("imageUrl from server", imageUrl);

    const { data: image, error } = await supabase.storage
      .from("post")
      .upload(fileName, imageUrl);
    console.log("supabase error storage", error);

    if (error) throw new Error(error.message);

    const { data: url, error: urlError } = await supabase.storage
      .from("post")
      .createSignedUrl(fileName, 3600);

    console.log("urlError", urlError);

    if (error) throw new Error(urlError?.message);

    const body = JSON.stringify({
      title,
      content,
      imageUrl: url?.signedUrl,
    });

    console.log("body post", body);

    const response = await fetch(`${process.env.BASE_URL}/api/post/create`, {
      method: "POST",
      body: body,
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    console.log("post create", data);

    if (data.status !== 201) throw new Error("Failed creating post");
  } catch (error) {
    console.error("Error create post", error);
    throw error;
  }

  revalidatePath("/");
  redirect("/");
}
