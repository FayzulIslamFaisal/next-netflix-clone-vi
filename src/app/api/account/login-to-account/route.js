export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma-db-connect/prisma-connect';
import { compare } from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { uid, id, pin } = body;

    // Input validation
    if (!uid || !id || !pin) {
      return NextResponse.json(
        {
          success: false,
          message: 'uid, id, and pin are required.',
        },
        { status: 400 }
      );
    }

    // Find account
    const existingAccount = await prisma.account.findFirst({
      where: {
        id,
        uid,
      },
    });

    if (!existingAccount) {
      return NextResponse.json(
        {
          success: false,
          message: 'Account not found.',
        },
        { status: 404 }
      );
    }

    // Validate pin
    const isPinValid = await compare(pin, existingAccount.pin || '');

    if (!isPinValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Incorrect PIN! Please try again.',
        },
        { status: 401 }
      );
    }

    // Successful login
    return NextResponse.json(
      {
        success: true,
        message: 'Welcome to Netflix.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/account error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong.',
      },
      { status: 500 }
    );
  }
}
