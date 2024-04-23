import { NextResponse } from "next/server";

export async function POST(request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  const nextResponse = NextResponse.json({
    message: "Cookie set successfully",
  });

  // Set the cookie with the received token
  nextResponse.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  return nextResponse;
}
