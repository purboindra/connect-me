import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Unauthorized", status: 401 });

    const parseToken = verifyToken(token);
    const currentUserid = (parseToken as any).userId;

    const users = await prisma?.follow.findMany({
      where: {
        followingUserId: Number.parseInt(currentUserid),
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return NextResponse.json({
      message: "Success get data follow",
      status: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
