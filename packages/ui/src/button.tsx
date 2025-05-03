"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => window.location.href = 'http://localhost:3001/auth/signin/google'}
    >
      {children}
    </button>
  );
};
