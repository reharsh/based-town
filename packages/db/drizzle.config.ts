import { defineConfig } from "drizzle-kit";
import { connectionString } from "./schema";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: connectionString!,
  },
});
