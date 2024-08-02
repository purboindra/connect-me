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
        status: 401,
      });
    }

    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Invalid token", status: 401 });

    const savedPosts = await prisma.savedPost.findMany({
      where: {
        userId: Number.parseInt(userId),
      },
      include: {
        user: true,
        post: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      message: "Success get saved posts",
      status: 200,
      data: savedPosts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
