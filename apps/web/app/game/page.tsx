"use client";
import dynamic from "next/dynamic";
import PhaserGame from "../../components/PhaserGame";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { handleSignIn, handleSignOut } from "@/utils/auth";

export default function Game() {
    const {data: session, status} = useSession();
    let label = "John Doe";
    if (status === "authenticated") {
        label = session?.user?.name!;
    }
    return (
        <main>
            <h1>Based Town v 0.0000001 {label}</h1>{status=="authenticated" ? <Button onClick={()=>{
                handleSignOut()
            }}>Sign out</Button> : <Button onClick={()=>{
                handleSignIn()
            }}>Sign in</Button>}
            <div className=" h-full bg-black flex justify-center items-center">
            <PhaserGame />
            </div>
        </main>
    )
}