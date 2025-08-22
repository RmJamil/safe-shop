"use client"
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

const LoginButton = () => {
    return (
      <Link href='/login'>
            <button  className='btn'>Login</button>
      </Link>
    );
};

export default LoginButton;