import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface IParams {
  userId: string;
}

export async function GET(req: NextRequest, { params }: { params: IParams }) {
  const { userId } = params;

  try {
    if (!userId) {
      return NextResponse.json({
        message: "Invalid user id",
        status: 404,
      });
    }

    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Invalid token", status: 401 });

    const posts = await prisma.post.findMany({
      where: {
        authorId: Number.parseInt(userId),
      },
    });

    return NextResponse.json({
      message: "Success get posts",
      status: 200,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
