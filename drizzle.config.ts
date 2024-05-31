// import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

// export default {
//   schema: "./src/lib/db/schema.ts",
//   out: "./drizzle",
//   driver: 'pg',
//   dbCredentials: {
//     connectionString:"postgresql://chatpdfdb_owner:m3bHCu8PJNso@ep-blue-dew-a5jmoezr.us-east-2.aws.neon.tech/chatpdfdb?sslmode=require",
//   }
// } satisfies Config;

import { defineConfig } from 'drizzle-kit'
console.log(process.env.NEXT_PUBLIC_DATABASE_URL)

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})