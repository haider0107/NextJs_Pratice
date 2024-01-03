import prisma from "@/prisma";
import { getCurrentUser } from "@/utils/session";
import { NextResponse } from "next/server";

// Check if user is authorized
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const data = req.url.split("posts/")[1];
    const postId = data.split("/")[0];

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        userId: user.id,
      },
    });

    if (post) {
      return NextResponse.json({ success: "Authorized User" }, { status: 200 });
    } else {
      return NextResponse.json({ success: "Unauthorized" }, { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "ID 'edit' Post route error" },
      { status: 500 }
    );
  }
}
