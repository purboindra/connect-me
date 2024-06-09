import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "@/lib/utils";
import { addDays, addMinutes } from "date-fns";

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
      if (existingToken) {
        prisma.token.update({
          where: {
            token: existingToken.token,
            id: existingToken.id,
          },
          data: {
            token: token,
            expiresAt: parseExpToken,
          },
        });
      } else {
        prisma.token.create({
          data: {
            token,
            userId: user.id,
            expiresAt: parseExpToken,
          },
        });
      }

      if (existingRefreshToken) {
        prisma.refreshToken.update({
          where: {
            token: existingRefreshToken.token,
            id: existingRefreshToken.id,
          },
          data: {
            expiresAt: parseExpRefresh,
            token: refreshToken,
          },
        });
      } else {
        prisma.refreshToken.create({
          data: {
            expiresAt: parseExpRefresh,
            token: refreshToken,
            userId: user.id,
          },
        });
      }
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
