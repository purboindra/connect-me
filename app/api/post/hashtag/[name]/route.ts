import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  name: string;
}

export async function GET(req: NextRequest, { params }: { params: IParams }) {
  req.headers.set("hashtag", params.name);
  try {
    const { name } = params;

    if (!name)
      return NextResponse.json({
        message: "Invalid hashtag name",
        status: 422,
      });

    const hashtags = await prisma?.hashtag.findMany({
      where: {
        name: `#${name.toLowerCase()}`,
      },
      include: {
        posts: {
          include: {
            post: {
              include: {
                author: true,
                comments: true,
                hashtag: true,
                likes: true,
                savedBy: true,
              },
            },
          },
        },
      },
    });

    const posts = hashtags?.flatMap((hashtag) =>
      hashtag.posts.map((postHashtag) => postHashtag.post)
    );

    console.log("post api", posts);

    return NextResponse.json({
      message: "Success get posts by hashtag",
      status: 200,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
    });
  }
}
