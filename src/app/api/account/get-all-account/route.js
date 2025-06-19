import { NextResponse } from "next/server";
import { prisma } from "@/prisma-db-connect/prisma-connect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    let accounts;

    if (uid) {
      accounts = await prisma.account.findMany({
        where: { uid },
        select: {
          id: true,
          uid: true,
          name: true,
          pin: true,
        },
      });
    } else {
      accounts = await prisma.account.findMany({
        select: {
          id: true,
          uid: true,
          name: true,
          pin: true,
        },
      });
    }

    // ✅ Check if no account found
    if (accounts.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No accounts found.",
          data: [],
        },
        { status: 404 }
      );
    }

    // ✅ Success response
    return NextResponse.json({
      success: true,
      message: "Fetched account(s).",
      data: accounts,
    });
  } catch (error) {
    console.error("GET /api/account error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch accounts.",
      },
      { status: 500 }
    );
  }
}
