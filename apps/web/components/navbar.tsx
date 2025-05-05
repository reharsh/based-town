"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react"
import { Menu, Option, OptionIcon } from "lucide-react";

const Navbar = () => {
  const {data: session, status} = useSession()

  if(status==="authenticated"){
    return (
      <nav className="fixed top-0 left-0 w-full bg-town-light/90 backdrop-blur-sm z-50 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-town-green rounded-lg flex items-center justify-center">
              <span className="font-pixel text-3xl">B</span>
            </div>
            <span className="font-pixel text-town-green text-lg">Based Town</span>
          </div>
          
          <div>
            <Link href="/home"><Button size="icon">
              <Menu/>
            </Button>
            </Link>
          </div>
        </div>
      </nav> )
  }


  return (
    <nav className="fixed top-0 left-0 w-full bg-town-light/90 backdrop-blur-sm z-50 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-town-green rounded-lg flex items-center justify-center">
            <span className="font-pixel text-white text-sm">B</span>
          </div>
          <span className="font-pixel text-town-green text-lg">Based Town</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-gray-700 hover:text-town-green transition-colors text-sm">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-town-green transition-colors text-sm">How It Works</a>
          <a href="#pricing" className="text-gray-700 hover:text-town-green transition-colors text-sm">Join Us</a>
        </div>
        
        <div>
          <Link href="/home"><Button>
            Enter Town
          </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;