import { relations } from "drizzle-orm";
import {
  text,
  sqliteTable,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  postText: text("post_text").notNull(),
  username: text("username")
    .notNull()
    .references(() => users.username, { onDelete: "cascade" }),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey(),
  commentBody: text("comment_body").notNull(),
  postId: integer("post_id").references(() => posts.id, {
    onDelete: "cascade",
  }),
  username: text("username")
    .notNull()
    .references(() => users.username, {
      onDelete: "cascade",
    }),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const likes = sqliteTable(
  "likes",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, {
        onDelete: "cascade",
      }),
    username: text("username")
      .notNull()
      .references(() => users.username, {
        onDelete: "cascade",
      }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.username] }),
    };
  },
);

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
    relationName: "postlikes",
  }),
}));

export const postsRelations = relations(posts, ({ many }) => ({
  likes: many(likes, {
    relationName: "postlikes",
  }),
}));
