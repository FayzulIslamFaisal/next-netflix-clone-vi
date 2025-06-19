export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma-db-connect/prisma-connect';
export async function POST(req) {
  try {
    const body = await req.json();
    const { uid, name, pin } = body;
    if (!uid || !name || !pin) {
      return NextResponse.json({
        success: false,
        message: "uid, name, and pin are required.",
      }, { status: 400 });
    }

    const newAccount = await prisma.account.create({
      data: {
        uid,
        name,
        pin,
      },
    });

    return NextResponse.json({
      success: true,
      message:"New Account Created Successfully!",
      data: newAccount,
    });
  } catch (error) {
    console.error("POST /api/account error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    }, { status: 500 });
  }
}