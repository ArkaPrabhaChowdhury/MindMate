// app/api/hello/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Hello from Next.js API!" });
}

export async function POST(request) {
  const { name } = await request.json();
  console.log(name);
  return NextResponse.json({ message: `Hello, ${name}!` });
}
