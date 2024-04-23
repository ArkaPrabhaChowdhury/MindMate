import User from "@/lib/databases/user";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const { uid, chat_history } = await request.json();
    console.log("Received request body:", { uid, chat_history });

    // Find the user by UID
    console.log(uid)
    const user = await User.findOne({ uid :uid });
    console.log("Found user:", user);

    if (!user) {
      // Return an error response if user is not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add the new chat history to the existing chat history array
    user.chat_history = [...(user.chat_history || []), ...chat_history];

    // Save the updated user document
    await user.save();
    console.log("Chat history updated successfully");

    // Return a success response
    return NextResponse.json({ message: "Chat history updated successfully" }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error updating chat history:", error);
    return NextResponse.json({ error: "Failed to update chat history" }, { status: 500 });
  }
}