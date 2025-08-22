"use client";
import React from 'react';

const Hero = () => {
    return (
        <div className='rounded-2xl'>
            <div
  className="hero h-[50vh] my-4 rounded-2xl"
  style={{
    backgroundImage:
      "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}
>
  <div className="hero-overlay rounded-2xl"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Shop safe</h1>
      <p className="mb-5">
       Bangladesh's Best Online Shopping Store with 17+ Million Products
        at Resounding Discounts in Dhaka & All Across Bangladesh with Cash on Delivery (COD).
      </p>
   
    </div>
  </div>
</div>
        </div>
    );
};

export default Hero;