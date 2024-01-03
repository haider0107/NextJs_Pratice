import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = req.url.split("posts/")[1];

    const postData = await prisma.post.findUnique({
      where: {
        id: data,
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ postData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "ID Post route error" }, { status: 500 });
  }
}
