import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("アクセスされました！");
  try {
    console.log("tryを通っているよ")
    console.log("prismaは", prisma);
    console.log("prisma.commentは", prisma.comment);
    const comments = await prisma.comment.findMany();
    console.log("route.tsのcommentsは", comments)
    return NextResponse.json({ message: "Success", comments }, { status: 200 });
  } catch( error ) {
    console.error("エアーを通っているよ")
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, content } = await req.json();
    const post = await prisma.comment.create({ data: { title, content }});
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch( error ) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};