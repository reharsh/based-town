"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignInForm";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  
  useEffect(() => {
    document.title = isSignIn ? "Sign In | Based Town" : "Sign Up | Based Town";
  }, [isSignIn]);

  return (
    <div className="min-h-screen bg-town-light flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-town-green rounded-lg flex items-center justify-center">
            <span className="font-pixel text-white text-sm">B</span>
          </div>
          <span className="font-pixel text-town-green text-lg">Based Town</span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-xl p-8 border border-town-green/20">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {isSignIn ? "Welcome Back!" : "Join Based Town"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isSignIn 
                  ? "Enter your details to access your town" 
                  : "Create an account to start your learning adventure"}
              </p>
            </div>
            
            {isSignIn ? <SignInForm /> : <SignUpForm />}
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
                <button
                  className="mx-2 font-semibold text-town-green"
                  onClick={() => setIsSignIn(!isSignIn)}
                >
                  {isSignIn ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              By using Based Town, you agree to our{" "}
              <a href="#" className="text-town-green hover:underline">Terms</a> and{" "}
              <a href="#" className="text-town-green hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;