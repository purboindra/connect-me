import { NextRequest, NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: IParams }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({
      message: "Invalid post id",
      status: 401,
    });
  }

  try {
    const post = await prisma?.post.findUnique({
      where: {
        id: Number.parseInt(id),
      },
      include: {
        author: true,
        comments: {
          include: {
            likes: true,
            author: true,
            post: true,
          },
        },
        hashtag: true,
        likes: true,
        savedBy: {
          where: {
            userId: {
              not: undefined,
            },
          },
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Successfully get post",
      status: 200,
      data: post,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    return NextResponse.json({
      message: "Internal server erroasasar",
      status: 500,
    });
  }
}
