import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // your MongoDB connection

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, price, details } = body;

    if (!email || !name || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("firstAuth"); 
    const collection = db.collection("productCollection");

    const product = {
      email,
      name,
      price: parseFloat(price),
      details,
      createdAt: new Date(),
    };

    await collection.insertOne(product);

    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting product:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
