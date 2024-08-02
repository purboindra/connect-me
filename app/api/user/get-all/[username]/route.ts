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
