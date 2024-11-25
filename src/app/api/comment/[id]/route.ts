import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export const GET = async ( req: Request ) => {
  try {
    const id: number = parseInt(req.url.split("comment/")[1]);
    const comment = await prisma.comment.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", comment }, { status: 200 });
  } catch( error ) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async ( req: Request ) => {
  try {
    const id: number = parseInt(req.url.split("comment/")[1]);
    const { title, content } = await req.json();
    const comment = await prisma.comment.update({ where: { id }, data: { title, content } });
    return NextResponse.json({ message: "Success", comment }, { status: 200 });
  } catch( error ) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async ( req: Request ) => {
  try {
    const id: number = parseInt(req.url.split("comment/")[1]);
    const comment = await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ message: "Success", comment }, { status: 200 });
  } catch( error ) {
    return NextResponse.json({ message: "failed", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};