import prisma from "@/prisma";
import { getCurrentUser } from "@/utils/session";
import { NextResponse } from "next/server";

// Get a single post
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
    return NextResponse.json(
      { message: "ID Post route error" },
      { status: 500 }
    );
  }
}

// Update post with userId and PostID
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const data = req.url.split("posts/")[1];

    const { title, content } = await req.json();

    const updatePost = await prisma.post.update({
      where: {
        id: data,
        userId: user.id,
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({ success: "Post updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "ID 'Update' Post route error" },
      { status: 500 }
    );
  }
}

const deleteComments = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });

    if (comments) {
      let commentId = comments.map((ele) => ele.id);
      const deleteComments = await prisma.comment.deleteMany({
        where: {
          id: {
            in: commentId,
          },
        },
      });
      console.log(deleteComments);

      if (deleteComments) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete a Post
export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { message: "Not Authenticated!" },
        { status: 401 }
      );
    }

    const data = req.url.split("posts/")[1];

    const isCommentDeleted = await deleteComments(data);
    if (isCommentDeleted) {
      await prisma.post.delete({
        where: {
          id: data,
        },
      });
    } else {
      return NextResponse.json(
        { message: "Comment deletion problem" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "ID Post route error" },
      { status: 500 }
    );
  }
}
