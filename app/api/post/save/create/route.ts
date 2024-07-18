import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Invalid token", status: 401 });

    const payload = verifyToken(token);
    const userId = (payload as any).userId;

    const { post_id } = await req.json();

    await prisma.savedPost.create({
      data: {
        postId: Number.parseInt(post_id),
        userId: Number.parseInt(userId),
      },
    });

    await prisma.post.update({
      where: {
        id: Number.parseInt(post_id),
      },
      data: {
        savedBy: {
          connect: {
            id: Number.parseInt(post_id),
          },
        },
      },
    });

    return NextResponse.json({
      message: "Success save post",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
