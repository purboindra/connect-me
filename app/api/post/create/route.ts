import { verifyToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const supabase = createClient();

  const token = requestHeaders.get("Authorization");

  if (!token)
    return NextResponse.json({ message: "Invalid token", status: 401 });

  const { title, content, file } = await req.json();

  if (!title || !content)
    return NextResponse.json({
      status: 400,
      message: "Title or content is required",
    });

  console.log("FILE IMAGE URL BACKEND", file);

  try {
    const payload = verifyToken(token);
    const userId = (payload as any).userId;

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        imageUrl: file,
        hashtag: {},
        author: {
          connect: {
            id: userId,
          },
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
