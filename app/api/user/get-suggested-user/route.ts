import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import console from "console";
import { verifyToken } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const token = requestHeaders.get("Authorization");

  if (!token)
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });

  const payload = verifyToken(token);
  const userId = (payload as any).userId;

  try {
    const user = await prisma.user.findMany({
      where: {
        followers: {
          none: {
            followingUserId: userId,
          },
        },
        id: {
          not: userId,
        },
      },
      include: {
        followers: {
          include: {
            follower: true,
          },
        },
        following: {
          include: {
            following: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Successfully get suggested user",
      data: user,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
