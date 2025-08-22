// /app/api/login/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("firstAuth");
    const user = await db.collection("users").findOne({ email:email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
