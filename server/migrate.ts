import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { db, turso } from "./db.js";

await migrate(db, { migrationsFolder: "./drizzle/migrations" });

turso.close();
