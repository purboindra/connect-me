import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const email = body.email;
  const password = body.password;
  const username = body.username;

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

    console.log(passwordHash);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        username: username,
        photo_url: "",
      },
    });

    return NextResponse.json({
      message: "user created",
      status: 201,
      // data: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
