import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  username: string;
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: IParams;
  }
) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Unauthorized", status: 401 });

    const parseToken = verifyToken(token);
    const currentUserid = (parseToken as any).userId;

    const { username } = params;

    if (!username) {
      return NextResponse.json({
        message: "Invalid user",
        status: 422,
      });
    }

    const user = await prisma?.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
        NOT: {
          id: Number.parseInt(currentUserid),
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
      message: "Successfully get user",
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
