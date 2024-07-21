import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Unauthorized", status: 401 });

    const parseToken = verifyToken(token);
    const currentUserid = (parseToken as any).userId;

    const body = await req.json();

    const { userId } = body;

    if (!userId)
      return NextResponse.json({ message: "Invalid user id", status: 404 });

    await prisma?.follow.delete({
      where: {
        followingUserId_followedUserId: {
          followingUserId: Number.parseInt(currentUserid),
          followedUserId: Number.parseInt(userId),
        },
      },
    });

    return NextResponse.json({
      message: "Success unfollow user",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
