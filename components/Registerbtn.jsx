
"use client"
import Link from 'next/link';
import React from 'react';

const Registerbtn = () => {
    return (
        <div>
            <Link href='/register'>
                        <button className='btn'>Register</button>
                    </Link>
        </div>
    );
};

export default Registerbtn;