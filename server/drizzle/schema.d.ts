export declare const posts: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "posts";
    schema: undefined;
    columns: {
        title: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "title";
            tableName: "posts";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        postText: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "post_text";
            tableName: "posts";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        username: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "username";
            tableName: "posts";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
    };
    dialect: "sqlite";
}>;
