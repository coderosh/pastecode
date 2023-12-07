import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const codes = sqliteTable("snippets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  theme: text("theme").notNull(),
  type: text("type", {
    enum: ["public", "private", "unlisted"],
  })
    .default("public")
    .notNull(),
  author: text("author")
    .references(() => users.id)
    .notNull(),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
