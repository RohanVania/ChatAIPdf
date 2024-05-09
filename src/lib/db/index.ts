
//* Connecting Drizzle orm to Neon Serverless database

import {neon,neonConfig} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http";

if(!process.env.DATABASE_URL){
    throw new Error("Database url not found");
}

const neonconnection=neon(process.env.DATABASE_URL);
export const db=drizzle(neonconnection);

 

