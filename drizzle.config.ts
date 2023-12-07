import getEnv from "@/lib/get-env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  driver: "libsql",
  dbCredentials: {
    url: getEnv("DB_URL"),
  },
  out: "./drizzle",
  schema: "./src/db/schema.ts",
});
