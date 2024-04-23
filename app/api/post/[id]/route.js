import Post from "@/lib/databases/post";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {

  try {
    await connectToDB();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    console.log("ID:", id)

    const post = await Post.findById(id);
    console.log("Post:", post);

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { message: error }
    );
  }
}
