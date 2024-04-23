import User from "@/lib/databases/user";
import { connectToDB } from "@/lib/mongoose";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDB();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    console.log("Token:", token);

    if (!token) {
      return NextResponse.json(
        { error: "Missing token in request body" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ token });
    console.log("User get name works!:", user);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
