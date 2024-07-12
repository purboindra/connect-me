import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Invalid token", status: 401 });

    const payload = verifyToken(token);
    const userId = (payload as any).userId;

    const { post_id } = await req.json();

    console.log(`post id: ${post_id} -- ${userId}`);

    const responseLike = await prisma.like.create({
      data: {
        postId: Number.parseInt(post_id),
        userId: Number.parseInt(userId),
      },
    });

    console.log("responseLike", responseLike);

    const updateddd = await prisma.post.update({
      where: {
        id: Number.parseInt(post_id),
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    console.log("updatedd", updateddd);

    return NextResponse.json({
      message: "Success like post",
      statusCode: 201,
      data: null,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Internal server error",
      statusCode: 500,
      data: null,
    });
  }
}
