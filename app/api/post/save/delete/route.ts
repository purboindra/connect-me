import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";

export async function DELETE(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Invalid token", status: 401 });

    const payload = verifyToken(token);
    const userId = (payload as any).userId;

    const { post_id } = await req.json();

    await prisma.savedPost.delete({
      where: {
        userId_postId: {
          userId: Number.parseInt(userId),
          postId: Number.parseInt(post_id),
        },
      },
    });

    // await prisma.savedPost.update({
    //   where: {
    //     userId_postId: {
    //       postId: Number.parseInt(post_id),
    //       userId: Number.parseInt(userId),
    //     },
    //   },
    //   data:{

    //   }
    // });

    return NextResponse.json({
      message: "Success delete post",
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
