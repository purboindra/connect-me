import { NextRequest, NextResponse } from "next/server";

interface IParams {
  userId: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const requestHeaders = new Headers(request.headers);

  const token = requestHeaders.get("Authorization");

  if (!token)
    return NextResponse.json({ message: "Invalid token", status: 401 });

  const { userId } = params;

  try {
    if (!userId) {
      return NextResponse.json({
        message: "User not valid",
        status: 404,
      });
    }

    const { username, bio, image_url } = await request.json();

    await prisma?.user.update({
      where: {
        id: Number.parseInt(userId),
      },
      data: {
        username,
        bio,
        photo_url: image_url,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Successfully edit user",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
