import { pgTable, bigserial, timestamp, text } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";

export const tokens = pgTable(
  "tokens",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    token: text("token").notNull(),
    userId: bigserial("userId", { mode: "number" })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (tokens) => {
    return {
      userIdIndex: index("userId_token_idx").on(tokens.userId),
      tokenIndex: index("token_token_idx").on(tokens.token),
    };
  }
);

export const tokensRelations = relations(tokens, ({ one }) => ({
  authToken: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
