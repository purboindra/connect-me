import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  const requestHeaders = new Headers(req.headers);

  const token = requestHeaders.get("Authorization");

  if (!token)
    return NextResponse.json({ message: "Invalid token", status: 422 });

  if (!refreshToken) {
    return NextResponse.json({
      message: "Invalid refresh token",
      status: 422,
    });
  }

  const payload = verifyRefreshToken(refreshToken);
  const userId = (payload as any).userId;

  try {
    const existToken = await prisma?.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!existToken || existToken.userId !== userId)
      return NextResponse.json({
        message: "Invalid user",
        status: 401,
      });

    const accessToken = generateToken({ userId });
    const newRefreshToken = generateRefreshToken({ userId });

    await prisma?.$transaction([
      prisma.refreshToken.update({
        where: {
          id: userId,
        },
        data: {
          token: newRefreshToken,
        },
      }),
      prisma.token.update({
        where: {
          id: userId,
        },
        data: {
          token: accessToken,
        },
      }),
    ]);

    return NextResponse.json({
      data: {
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      },
      message: "Successfully refresh token",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
