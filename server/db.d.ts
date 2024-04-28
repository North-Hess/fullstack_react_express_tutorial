import * as schema from "./drizzle/schema";
export declare const turso: import("@libsql/client").Client;
export declare const db: import("drizzle-orm/libsql").LibSQLDatabase<typeof schema>;
