import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        hashtag: true,
        likes: true,
      },

      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      message: "Success get all post",
      statusCode: 200,
      data: {
        posts: posts,
      },
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
