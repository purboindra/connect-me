"use server";

import { CreatePostSchema, CreatePostState } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addHashtags, dynamicToPostInterface } from "@/lib/utils";
import console from "console";

export async function createPost(
  prevState: CreatePostState,
  formData: FormData
) {
  const token = cookies().get("access_token")?.value;
  const supabase = createClient();

  if (!token) throw new Error("Invalid token");

  Array.from(formData.entries()).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  const validateFields = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const title = validateFields.data.title;
  const content = validateFields.data.content;
  const imageUrl = validateFields.data.imageUrl;

  const hashtags = addHashtags(content);

  console.log(hashtags);

  try {
    const fileName = `${Date.now()}_${imageUrl.name}`;

    const { error } = await supabase.storage
      .from("post")
      .upload(fileName, imageUrl);

    // if (error) {
    //   console.log("supabase error storage", error);
    //   throw new Error(error.message);
    // }

    const { data: url, error: urlError } = await supabase.storage
      .from("post")
      .createSignedUrl(fileName, 3600);

    // if (urlError) {
    //   console.log("error createSignedUrl", urlError);
    //   throw new Error(urlError?.message);
    // }

    const body = JSON.stringify({
      title,
      content,
      hashtags,
      imageUrl: url?.signedUrl,
    });

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

export async function fetchAllPost() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/post/get-all`, {
      method: "GET",
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return dynamicToPostInterface(data.data.posts);
  } catch (error) {
    console.log("Error fetchAllPost", error);
    throw error;
  }
}
