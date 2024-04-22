export async function POST(request) {
  const { user } = await request.json();
  console.log(user);
  return NextResponse.json({ message: `Hello, ${user}!` });
}
