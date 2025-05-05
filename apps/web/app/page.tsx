import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <HeroSection></HeroSection>
    </div>
  );
}
