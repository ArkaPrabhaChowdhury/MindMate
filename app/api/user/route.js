import User from "@/lib/databases/user";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, uid } = await request.json();

  try {
    await connectToDB();

    const newUser = await User.create({
      name,
      email,
      uid,
    });

    console.log(`Inserted user with ID: ${newUser._id}`);

    const nextResponse = NextResponse.json({
      message: "Cookie set successfully",
    });

    // Set the cookie with the received token
    nextResponse.cookies.set("serverToken", uid, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Failed to insert user" },
      { status: 500 }
    );
  }
}
