import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ProductDetailsPage({ params }) {
  // ✅ Await params if needed (app router passes it as object)
  const { id } = params; 

  // Fetch single product from MongoDB
  const client = await clientPromise;
  const db = client.db("firstAuth"); // replace with your DB name
  const product = await db
    .collection("productCollection")
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  return (
 <div className="flex flex-col bg-sky-100 min-h-[100vh]">
  <Navbar/>
     <div className="p-6 flex flex-col justify-center items-center w-full grow  ">
      <div className=" mx-auto border shadow-lg rounded-box p-6">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-2">{product.details}</p>
        <p className="font-semibold mb-2">Price: ${product.price}</p>
        <p className="text-gray-500 text-sm">
          Created At: {new Date(product.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
    <Footer/>
 </div>
  );
}
