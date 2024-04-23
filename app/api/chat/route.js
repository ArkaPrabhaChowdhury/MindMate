import User from "@/lib/databases/user";
import { connectToDB } from "@/lib/mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDB();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // Parse the request body
    const { chat_history } = await request.json();
    console.log("Received request body:", { chat_history });
    console.log("Token:", token);

    // Find the user by UID
    const user = await User.findOne({ uid: token });
    console.log("Found user:", user);
    if (!user) {
      // Return an error response if user is not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate the chat_history array
    const validChatHistory = chat_history.filter(
      (item) => item.content && item.response
    );
    if (validChatHistory.length !== chat_history.length) {
      console.warn(
        "Some items in the chat_history array are missing required fields."
      );
    }

    // Check for existing entries and update the user's chat history
    const existingChatHistory = user.chat_history || [];
    const updatedChatHistory = [
      ...existingChatHistory,
      ...validChatHistory.filter(
        (item) =>
          !existingChatHistory.some(
            (existingItem) =>
              existingItem.content === item.content &&
              existingItem.response === item.response
          )
      ),
    ];
    user.chat_history = updatedChatHistory;

    // Save the updated user document
    await user.save();
    console.log("Chat history updated successfully");

    // Return a success response
    return NextResponse.json(
      { message: "Chat history updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    console.error("Error updating chat history:", error);
    return NextResponse.json(
      { error: "Failed to update chat history" },
      { status: 500 }
    );
  }
}
