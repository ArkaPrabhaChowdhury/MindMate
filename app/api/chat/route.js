import User from "@/lib/databases/user";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

// ...

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const { uid, chatHistory } = await request.json();
    console.log("Received request body:", { uid, chatHistory });

    // Find the user by UID
    const user = await User.findOne({ uid });
    console.log("Found user:", user);

    if (!user) {
      // Return an error response if user is not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's chat history
    user.chatHistory = chatHistory; // chatHistory should now be an array of objects

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