import { ExpressAuth } from "@auth/express"
import Google from "@auth/express/providers/google"
import express, { Router, type Request, type Response } from "express"
 
const authRouter = Router()

authRouter.post("/signin", async (req: Request, res: Response) => {
    try {
      res.redirect("/dashboard")
    } catch (error) {
      res.status(500).send("Sign in failed")
    }
  })