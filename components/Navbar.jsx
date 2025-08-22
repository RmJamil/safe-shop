"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession({ required: false });
// const session=useSession();
console.log({session,status});

  if (status === "loading") {
    return (
      <div className="navbar bg-base-100 justify-between px-5">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }
  return (
    <div
      className="navbar bg-sky-300 p-4 justify-between lg:px-20"
      key={session?.user?.email || "guest"}
    >
      <h1 className="text-xl font-bold text-blue-500">Safe Shop</h1>
       <div>
  <Link href="/" className="btn bg-sky-500 mr-6 hover:bg-sky-600 border-none hover:text-white">
             Home
            </Link>

         <Link href="/products" className="btn bg-sky-500 mr-6 hover:bg-sky-600 border-none hover:text-white">
              Products
            </Link>

          {status === "authenticated" && (
          <Link href="/add-product" className="btn bg-sky-500 hover:bg-sky-600 border-none hover:text-white">
            Add Product
          </Link>
        )}


       </div>
 {session?.user ? (
        <div className="flex items-center gap-4">
          <span className="font-semibold">Hi, {session.user.name}</span>
          <button className="btn bg-sky-500 hover:bg-sky-600 border-none hover:text-white" onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          {/* <Link href="/register">
            <button className="btn bg-sky-500 hover:bg-sky-600 border-none hover:text-white">Sign Up</button>
          </Link> */}
         <Link href='/login'>
              <button className="btn bg-sky-500 hover:bg-sky-600 border-none hover:text-white" >
            Log In
          </button>
         </Link>
        </div>
      )}
 
    </div>
  );
}
