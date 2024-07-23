import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
      });

    const { commentId, userId } = await req.json();

    if (!commentId)
      return NextResponse.json({
        status: 404,
        message: "Invalid comment",
      });

    await prisma?.likeComment.delete({
      where: {
        userId_commentId: {
          commentId: Number.parseInt(commentId),
          userId: Number.parseInt(userId),
        },
      },
    });

    await prisma?.comment.update({
      where: {
        id: Number.parseInt(commentId),
      },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Success unlike comment",
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
