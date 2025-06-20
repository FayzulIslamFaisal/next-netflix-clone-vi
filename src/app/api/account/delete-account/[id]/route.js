import { prisma } from "@/prisma-db-connect/prisma-connect";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
   const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "id is required.",
        },
        { status: 400 }
      );
    }

    // Check if the account exists
    const existingAccount = await prisma.account.findFirst({
      where: { id },
    });
    console.log("existingAccount", existingAccount);

    if (!existingAccount) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found.",
        },
        { status: 404 }
      );
    }

    // Delete the account
    await prisma.account.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/account error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
