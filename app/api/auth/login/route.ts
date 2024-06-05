import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = body.email;
    const password = body.password;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user)
      return NextResponse.json({
        status: 401,
        message: "User not found",
      });

    return NextResponse.json({
      status: 201,
      message: "Login successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
