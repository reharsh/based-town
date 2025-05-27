import { ExpressAuth, getSession } from "@auth/express"
import cors from "cors"
import v1Router from "./src/routes"
import logger from "morgan"
import { authConfig } from "./src/config/auth.config"
import { authenticatedUser } from "./src/middlewares/auth.middleware"
import type { Request, Response } from "express"
import { signIn } from "./src/utils/auth"
import aiRouter from "./src/routes/ai"

const express = require('express')

const app = express()

app.use("/api/v1",v1Router)
app.use("/ai",aiRouter)
app.use(logger("dev"))



// ✅ Apply CORS to all routes
app.use(cors());

app.get("/login", async (req:Request,res: Response) => {
    const resp = await signIn(req,res)
    const body = await resp?.json()
    res.json({message: "noices...", res: resp})
  });

app.use("/auth", ExpressAuth(authConfig))


app.get('/protected',authenticatedUser,async (req: Request, res: Response)=>{
    const session = await getSession(req, authConfig)
    console.log("inside protected route",session)
    res.send('<p>hello world!!</p>')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})