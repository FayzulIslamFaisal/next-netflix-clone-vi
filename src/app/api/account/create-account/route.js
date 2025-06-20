export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
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

    // ✅ Condition 1: Same uid + name already exists
    const existingAccount = await prisma.account.findFirst({
      where: {
        uid,
        name,
      },
    });

    if (existingAccount) {
      return NextResponse.json({
        success: false,
        message: "Account with the same UID and Name already exists.",
      }, { status: 409 });
    }

    // ✅ Condition 2: Same uid already has 4 accounts
    const accountsWithSameUid = await prisma.account.findMany({
      where: { uid },
    });

    if (accountsWithSameUid.length === 4) {
      return NextResponse.json({
        success: false,
        message: "Maximum 4 accounts allowed for this UID.",
      }, { status: 403 });
    }

    // ✅ Hash the PIN
    const hashedPin = await hash(pin, 10);

    // ✅ Create new account with hashed pin
    const newAccount = await prisma.account.create({
      data: {
        uid,
        name,
        pin: hashedPin,
      },
    });

    return NextResponse.json({
      success: true,
      message: "New Account Created Successfully!",
      result: newAccount,
    });

  } catch (error) {
    console.error("POST /api/account error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong.",
    }, { status: 500 });
  }
}
