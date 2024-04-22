// app/api/chat/route.js
import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GET(request) {
  return NextResponse.json({ message: "Hello from Next.js API!" });
}

const genAI = new GoogleGenerativeAI("AIzaSyC0vSJY8Vg7Z8CQrEoklC7zNzVd_mOK3-c");
export async function POST(request) {
  const { newMessage } = await request.json();
  console.log(newMessage);
  // For text-only input, use the gemini-pro model
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(newMessage);
  const response = await result.response;
  const text = await response.text();

  // Return the response as JSON
  return NextResponse.json({ text : text});
}