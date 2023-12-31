import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsuccessull");
  }
}

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    await main();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    console.log(existingUser);
    

    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    console.log("registered");
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const userWithoutPassword = { ...newUser, password: undefined };
    return NextResponse.json({ userWithoutPassword }, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
};
