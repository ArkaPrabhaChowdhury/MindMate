import { cookies } from "next/headers";

export async function GET(request) {
  // Delete a specific cookie
  cookies().delete("token");

  return new Response("Cookie deleted");
}
