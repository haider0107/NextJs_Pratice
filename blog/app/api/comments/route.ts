import prisma from "@/prisma";
import { getCurrentUser } from "@/utils/session";
import { NextResponse } from "next/server";

// Post a comment
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const { postId, text } = await req.json();

    await prisma.comment.create({
      data: {
        postId,
        text,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { success: "Posted SuccessFully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Post route error" }, { status: 500 });
  }
}
