import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import console from "console";

export async function GET(req: NextRequest) {
  try {
    const user = await prisma.user.findMany();

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
