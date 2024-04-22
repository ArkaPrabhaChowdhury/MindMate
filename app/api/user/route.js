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

    return NextResponse.json({ message: `Hello, ${name}!` });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Failed to insert user" },
      { status: 500 }
    );
  }
}
