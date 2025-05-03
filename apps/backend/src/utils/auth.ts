import type { Request, Response } from "express";

export async function signIn(req: Request,res: Response) {
  try {
    const csrfRes = await fetch("http://localhost:3001/auth/csrf");

    // Log response details
    console.log("Response status:", csrfRes);
    console.log("Response content-type:", csrfRes.headers.get("content-type"));

    if (csrfRes.ok) {
      const csrf = await csrfRes.json();
      console.log("yooo",csrf)
      const resp = await fetch("http://localhost:3001/auth/signin/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          csrfToken: csrf.csrfToken,
          key2callbackUrl: `${process.env.FRONTEND_URL}/new`,
        }),
        credentials: "include", // include cookies if needed
      });
      return res.json({
        resp: resp
      })
    } else {
      console.error("Error fetching CSRF token:", csrfRes.statusText);
    }
  } catch (err) {
    console.error("Error during sign-in:", err);
  }
}
