"use client";
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const page = () => {
    const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
if (!session) {
  redirect("/login"); // instead of "Access denied"
}



    return (
        <div>
          <Navbar/>
            <h1>Welcome, {session.user.name}</h1>

<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
            

        </div>
    );
};

export default page;