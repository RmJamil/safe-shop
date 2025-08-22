import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("firstAuth"); // change this
    const collection = db.collection("productCollection");

    const products = await collection.find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
