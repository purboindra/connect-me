import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Invalid token", status: 401 });

    const payload = verifyToken(token);
    const userId = (payload as any).userId;

    const { postId, comment } = await req.json();

    if (!postId)
      return NextResponse.json({
        status: 404,
        message: "Post not found",
      });

    if (!comment)
      return NextResponse.json({
        message: "Required comment",
        statis: 422,
      });

    /// THIS FUNCTION TO STORE COMMENT TO DB
    const commentResponse = await prisma.comment.create({
      data: {
        content: comment,
        authorId: userId,
        postId: Number.parseInt(postId),
      },
    });

    /// UPDATED POST WHEN SUCCESS CREATE COMMENT
    await prisma.post.update({
      where: {
        id: Number.parseInt(postId),
      },
      data: {
        comments: {
          connect: {
            id: commentResponse.id,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Success add comment",
      status: 200,
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
