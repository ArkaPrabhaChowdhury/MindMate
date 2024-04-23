import Post from "@/lib/databases/post";
import User from "@/lib/databases/user";
import { connectToDB } from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { content, userId } = await request.json();

  try {
    await connectToDB();

    const newPost = await Post.create({
      content,
      uid: userId,
    });

    console.log("Created Post with ID: ", newPost._id);

    return NextResponse.json({ message: "Post created successfully!" });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { message: error }
    );
  }
}
export async function GET(request) {
  try {
    await connectToDB();

    const posts = await Post.find({ parentId: null });

    const postWithAuthorName = [];

    for (const post of posts) {
      const user = await User.findById(post.uid);
      console.log("User:", user);
      postWithAuthorName.push({
        ...post.toObject(),
        authorName: user.name,
      });
    }

    return NextResponse.json(postWithAuthorName);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch .posts" },
      { message: error }
    );
  }
}

export async function PATCH(request) {
  const { commentId, postId } = await request.json();

  try {
    await connectToDB();

    const parentPost = await Post.findById(postId);
    const commentPost = await Post.findById(commentId);

    parentPost.comments.push(commentId);
    commentPost.parentId = postId;

    await parentPost.save();
    await commentPost.save();

    return NextResponse.json({ message: "Comment added successfully!" });
  } catch (error) {
    console.error("Error Adding comments", error);
    return NextResponse.json(
      { error: "Failed to add comments" },
      { message: error }
    );
  }
}
