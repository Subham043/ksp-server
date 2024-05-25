import env from "../config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { users } from "./schema/user";
import { tokens } from "./schema/token";
import { criminals, criminalsRelations } from "./schema/criminal";
import { crimes, crimesRelations } from "./schema/crime";
import {
  crimesByCriminals,
  crimesByCriminalsRelations,
} from "./schema/crimesByCriminals";

const pool = new pg.Pool({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
});

export const db = drizzle(pool, {
  schema: {
    users,
    tokens,
    criminals,
    criminalsRelations,
    crimes,
    crimesRelations,
    crimesByCriminals,
    crimesByCriminalsRelations,
  },
});

export default db;
