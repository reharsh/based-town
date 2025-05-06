import { signIn, signOut } from "next-auth/react";

export async function handleSignOut(){
    try {
        await signOut({
            redirectTo: `${process.env.FRONTEND_URL}/auth`
        })
    } catch (error) {
        console.error("error caught while signing out: ", error)
    }
}


export async function handleSignIn(){
    try {
        await signIn("google")
    } catch (error) {
        console.error("error caught while signing out: ", error)
    }
}