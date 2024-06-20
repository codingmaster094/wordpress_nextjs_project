import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  if (!body.firstName || !body.email || !body.message) {
    return NextResponse.json({ data: "First name, email, and message fields are required!" }, { status: 400 });
  }

  return NextResponse.json({ data: "Form submitted successfully" });
}
