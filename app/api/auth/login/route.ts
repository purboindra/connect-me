import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = body.email;
    const password = body.password;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include: {
        tokens: true,
      },
    });

    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 401 });
    }

    const valid = await bcrypt.compare(password, user?.password || "");

    if (!valid)
      return NextResponse.json({ message: "Wrong password", status: 401 });

    return NextResponse.json({
      message: "Login successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
