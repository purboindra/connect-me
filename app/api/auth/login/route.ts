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

    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 401 });
    }

    return NextResponse.json({ message: "Login successfully", status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
