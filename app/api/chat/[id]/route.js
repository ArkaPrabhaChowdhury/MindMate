@ -0,0 +1,45 @@
import User from "@/lib/databases/user";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Connect to the database

    await connectToDB();

    // Get the UID from the URL query params
    const url = new URL(request.url);
    const uid = url.pathname.split("/").pop();

    if (!uid) {
      // Return an error response if UID is missing
      return NextResponse.json(
        { error: "Missing required parameter: uid" },
        { status: 400 }
      );
    }

    // Find the user by UID
    const user = await User.findOne({ uid });
    console.log("Found user:", user);

    if (!user) {
      // Return an error response if user is not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user's chat history
    return NextResponse.json(
      { chat_history: user.chat_history },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    console.error("Error fetching chat history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve chat history" },
      { status: 500 }
    );
  }
}