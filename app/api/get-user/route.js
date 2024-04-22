import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  // Get the serverToken from the cookie
  const cookieStore = cookies();
  const serverToken = cookieStore.get("serverToken");

  if (!serverToken) {
    // If the serverToken is not found, return an error response
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch user data using the serverToken
    const res = await fetch(`https://api.example.com/user`, {
      headers: {
        Authorization: `Bearer ${serverToken.value}`,
      },
    });

    if (!res.ok) {
      // If the API request fails, return an error response
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: 500 }
      );
    }

    const userData = await res.json();

    // Return the user data as the response
    return NextResponse.json(userData);
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
