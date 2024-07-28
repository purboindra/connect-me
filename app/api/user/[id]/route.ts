import { NextRequest, NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: IParams;
  }
) {
  try {
    const { id } = params;

    if (!id)
      return NextResponse.json({
        message: "Invalid user id",
        status: 422,
      });

    const user = await prisma?.user.findUnique({
      where: {
        id: Number.parseInt(id),
      },
    });

    if (!user)
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });

    return NextResponse.json({
      message: "Successfully get user",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
