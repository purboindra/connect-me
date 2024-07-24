import console from "console";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
      });

    const body = await req.json();

    if (!body)
      return NextResponse.json({
        message: "Invalid body",
        status: 422,
      });

    const { commentId, userId } = body;

    if (!commentId)
      return NextResponse.json({
        status: 404,
        message: "Invalid comment",
      });

    if (!commentId)
      return NextResponse.json({
        status: 404,
        message: "Invalid user",
      });

    await prisma?.likeComment.create({
      data: {
        commentId: Number.parseInt(commentId),
        userId: Number.parseInt(userId),
      },
    });

    await prisma?.comment.update({
      where: {
        id: Number.parseInt(commentId),
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Success like comment",
      statusCode: 201,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
