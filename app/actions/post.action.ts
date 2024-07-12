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

  try {
    const fileName = `${Date.now()}_${imageUrl.name}`;

    const { error } = await supabase.storage
      .from("post")
      .upload(fileName, imageUrl);

    if (error) {
      console.log("supabase error storage", error);
      throw new Error(error.message);
    }

    const { data: url, error: urlError } = await supabase.storage
      .from("post")
      .createSignedUrl(fileName, 3600);

    if (urlError) {
      console.log("error createSignedUrl", urlError);
      throw new Error(urlError?.message);
    }

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

    if (data.data == null) throw new Error("Data not found");

    return dynamicToPostInterface(data.data.posts);
  } catch (error) {
    console.log("Error fetchAllPost", error);
    throw error;
  }
}

export async function createLike(formData: FormData) {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const postId = formData.get("postId");

    if (!postId) throw new Error("Invalid post");

    const response = await fetch(
      `${process.env.BASE_URL}/api/post/like/create`,
      {
        method: "POST",
        body: JSON.stringify({ post_id: postId }),
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
    console.log("Error createLike", error);
    throw error;
  }
  revalidatePath("/");
}

export async function deleteLike(formData: FormData) {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    const postId = formData.get("postId");

    if (!postId) throw new Error("Invalid post");

    const response = await fetch(
      `${process.env.BASE_URL}/api/post/like/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ post_id: postId }),
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
    console.log("Error deleteLike", error);
    throw error;
  }
  revalidatePath("/");
}
