import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema"

export const sql = neon (process.env.Database_URL as string)  //get the database url from the environment)


const db = drizzle(sql, { schema, logger: true });  //create a drizzle instance

export default db;  //export the drizzle instance