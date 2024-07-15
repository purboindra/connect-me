import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils";
import console from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);

  const token = requestHeaders.get("Authorization");

  if (!token)
    return NextResponse.json({ message: "Invalid token", status: 401 });

  try {
    const payload = verifyToken(token);
    const userId = (payload as any).userId;

    console.log(payload);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user)
      return NextResponse.json({
        message: "User not found",
        status: 404,
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
