import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const requestHeaders = new Headers(req.headers);

    const token = requestHeaders.get("Authorization");

    if (!token)
      return NextResponse.json({ message: "Invalid token", status: 401 });

    const { title, content, imageUrl, hashtags } = await req.json();

    if (!title || !content)
      return NextResponse.json({
        status: 400,
        message: "Title or content is required",
      });

    /// LOWERCASE HASHTAGS
    const normalizedHashtags = (hashtags as string[]).map((hashtag) =>
      hashtag.toLowerCase()
    );

    const existingHashtags = await prisma.hashtag.findMany({
      where: {
        name: {
          in: normalizedHashtags,
        },
      },
    });

    const existingHashtagNames = existingHashtags.map(
      (hashtag) => hashtag.name
    );

    const newHashtags = normalizedHashtags.filter(
      (hashtag) => !existingHashtagNames.includes(hashtag)
    );

    await prisma.hashtag.createMany({
      data: newHashtags.map((hashtag) => ({ name: hashtag })),
      skipDuplicates: true,
    });

    const allHashtags = await prisma.hashtag.findMany({
      where: {
        name: {
          in: normalizedHashtags,
        },
      },
    });

    const payload = verifyToken(token);
    const userId = (payload as any).userId;

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        imageUrl,
        author: {
          connect: {
            id: userId,
          },
        },
        hashtag: {
          create: allHashtags.map((hashtag) => ({
            hashtag: { connect: { id: hashtag.id } },
          })),
        },
      },
    });

    if (!post)
      return NextResponse.json({
        message: "Failed create post",
        status: 400,
      });

    return NextResponse.json({
      message: "Post successfully created",
      status: 201,
    });
  } catch (error) {
    console.log("Error from create post", error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
