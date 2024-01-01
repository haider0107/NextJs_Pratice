import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface bodyType {
  email: string;
  username: string;
  password: string;
}


export async function POST(req: Request) {
  try {
    const body: bodyType = await req.json();

    const { email, username, password } = body;

    // check if email already exist
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //send error to user
    if (existUser) {
      return NextResponse.json(
        { user: null, message: "User Already exist" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    const { password: newPassowrd, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error during registering User" },
      { status: 500 }
    );
  }
}
