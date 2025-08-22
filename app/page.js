import Hero from "@/components/Hero";
import LoginButton from "@/components/LoginButton";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import ProductsHighlights from "@/components/productsHighlights";
import Registerbtn from "@/components/Registerbtn";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProductListPage from "./products/page";
import Footer from "@/components/Footer";
import ProductH from "./productH/page";

export default function Home() {

  return (
    <div className="bg-sky-200">


<Navbar/>
<div className="w-11/12 mx-auto">
  <Hero/>
 <ProductH/>
</div>
<Footer/>
    </div>
  );
}
