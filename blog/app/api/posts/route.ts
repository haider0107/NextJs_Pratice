import prisma from "@/prisma";
import { getCurrentUser } from "@/utils/session";
import { NextResponse } from "next/server";

// Create a new Post
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const { title, content } = await req.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    });

    return NextResponse.json({ success:"Post created successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Post route error" }, { status: 500 });
  }
}

// Get all post
export async function GET(req: Request) {
  try {
    const allPost = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
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

    return NextResponse.json({ allPost }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Post route error" }, { status: 500 });
  }
}
