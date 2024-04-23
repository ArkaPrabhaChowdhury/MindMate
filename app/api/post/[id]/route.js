import Post from "@/lib/databases/post";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const post = await Post.findById(id);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { message: error }
    );
  }
}
