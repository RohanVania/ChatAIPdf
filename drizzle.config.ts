// import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// dotenv.config();
 
// export default {
//   schema: "./src/lib/db/schema.ts",
//   out: "./drizzle",
//   driver: 'pg',
//   dbCredentials: {
//     connectionString:"postgresql://chatpdfdb_owner:m3bHCu8PJNso@ep-blue-dew-a5jmoezr.us-east-2.aws.neon.tech/chatpdfdb?sslmode=require",
//   }
// } satisfies Config;

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
 schema: "./src/lib/db/schema.ts",
  driver: 'pg',
  dbCredentials: {
    connectionString: "postgresql://chatpdfdb_owner:m3bHCu8PJNso@ep-blue-dew-a5jmoezr.us-east-2.aws.neon.tech/chatpdfdb?sslmode=require",
  },
  verbose: true,
  strict: true,
})