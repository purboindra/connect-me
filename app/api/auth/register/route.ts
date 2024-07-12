import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { email, password, username } = body;

  let userId = 0;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser)
      return NextResponse.json({
        message: "User already register",
        status: 401,
      });

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        username: username,
        photo_url: "",
      },
    });

    if (!user)
      return NextResponse.json({
        message: "User already register",
        status: 401,
      });

    userId = user.id;

    const token = generateToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    const tokenPayload = verifyToken(token);
    const refreshTokenPayload = verifyRefreshToken(refreshToken);

    const accessTokenExpiresAt = (tokenPayload as any).exp;
    const refreshTokenExpiresAt = (refreshTokenPayload as any).exp;

    const parseExpToken = new Date(accessTokenExpiresAt * 1000);
    const parseExpRefresh = new Date(refreshTokenExpiresAt * 1000);

    await prisma.$transaction([
      prisma.token.create({
        data: {
          token: token,
          expiresAt: parseExpToken,
          user: {
            connect: { id: user.id },
          },
        },
      }),

      prisma.refreshToken.create({
        data: {
          token: refreshToken,
          expiresAt: parseExpRefresh,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      message: "User created successfully",
      data: {
        user: user,
        access_token: token,
        refresh_token: refreshToken,
      },
      status: 201,
    });
  } catch (error) {
    console.error(error);

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
