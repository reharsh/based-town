import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { ExpressAuthConfig } from "@auth/express";
import Google from "@auth/express/providers/google";
import { db } from "@repo/db/schema"

export const authConfig: ExpressAuthConfig = {
    trustHost: true,
    providers: [Google],
    callbacks: {
         async redirect({url,baseUrl}){
            return `${process.env.FRONTEND_URL}/home`
         }
    },
    adapter: DrizzleAdapter(db)
}

