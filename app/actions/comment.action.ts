"use server";

import { parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function likeComment(userId: string, formData: FormData) {
  const cookiesStore = cookies();

  const token = cookiesStore.get("access_token");

  if (!token) throw new Error("Unauthorized");

  const commentId = formData.get("commentId");

  if (!commentId) throw new Error("Invalid comment");

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/comment/like/create`,
      {
        method: "POST",
        headers: {
          Authorization: token.value,
        },
        body: JSON.stringify({ commentId, userId }),
      }
    );

    const data = await response.json();

    if (response.status !== 200) throw new Error(`${data.message}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
  revalidatePath("/");
}

export async function deleteLikeComment(userId: string, formData: FormData) {
  const cookiesStore = cookies();

  const token = cookiesStore.get("access_token");

  if (!token) throw new Error("Unauthorized");

  const commentId = formData.get("commentId");

  if (!commentId) throw new Error("Invalid comment");

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/comment/like/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: token.value,
        },
        body: JSON.stringify({ commentId, userId }),
      }
    );

    const data = await response.json();

    if (response.status !== 200) throw new Error(`${data.message}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
  revalidatePath("/");
}
