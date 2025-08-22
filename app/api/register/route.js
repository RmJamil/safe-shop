// app/api/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb"; // ✅ Your own MongoDB connection logic

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("firstAuth");

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered", userId: result.insertedId });
  } catch (error) {
    console.error("REGISTER API ERROR:", error); // ✅ Check this in your terminal!
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
