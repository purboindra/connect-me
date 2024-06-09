import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        message: "Email and password are required",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        tokens: true,
        refreshTokens: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return NextResponse.json({ message: "Wrong password", status: 401 });

    const token = generateToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    const tokenPayload = verifyToken(token);
    const refreshTokenPayload = verifyRefreshToken(refreshToken);

    const accessTokenExpiresAt = (tokenPayload as any).exp;
    const refreshTokenExpiresAt = (refreshTokenPayload as any).exp;

    const parseExpToken = new Date(accessTokenExpiresAt * 1000);
    const parseExpRefresh = new Date(refreshTokenExpiresAt * 1000);

    const existingToken = user.tokens.length ? user.tokens[0] : null;
    const existingRefreshToken = user.refreshTokens.length
      ? user.refreshTokens[0]
      : null;

    await prisma.$transaction(async () => {
      prisma.token.upsert({
        where: {
          token: existingToken?.token,
          id: existingToken?.id,
        },
        create: {
          token,
          userId: user.id,
          expiresAt: parseExpToken,
        },
        update: {
          token: token,
          expiresAt: parseExpToken,
        },
      });

      prisma.refreshToken.upsert({
        where: {
          token: existingRefreshToken?.token,
          id: existingRefreshToken?.id,
        },
        create: {
          token: refreshToken,
          userId: user.id,
          expiresAt: parseExpRefresh,
        },
        update: {
          expiresAt: parseExpRefresh,
          token: refreshToken,
        },
      });
    });

    return NextResponse.json({
      message: "Login successfully",
      data: { user, token, refreshToken },
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
