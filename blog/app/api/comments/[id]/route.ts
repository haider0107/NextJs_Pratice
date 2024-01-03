import prisma from "@/prisma";
import { NextResponse } from "next/server";

// Get comments for post
export async function GET(req: Request) {
  try {
    const data = req.url.split("comments/")[1];

    const comments = await prisma.comment.findMany({
      where: {
        postId: data,
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
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "ID comment route error" },
      { status: 500 }
    );
  }
}
