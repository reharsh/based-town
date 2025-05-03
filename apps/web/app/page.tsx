"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <button onClick={()=> {
        console.log(process.env.AUTH_URL)
        signIn('google')
      }}>sign in</button>
      <button onClick={()=> {
        console.log(process.env.AUTH_URL)
        signOut()
      }}>sign out</button>
      <Link href="http://localhost:3001/protected">check signed in?</Link>
    </div>
  );
}
