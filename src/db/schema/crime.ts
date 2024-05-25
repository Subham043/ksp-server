import { relations } from "drizzle-orm";
import { pgTable, bigserial, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { pgEnum } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { bigint } from "drizzle-orm/pg-core";
import { crimesByCriminals } from "./crimesByCriminals";

export const gangEnum = pgEnum("isGang", ["Yes", "No"]);
export const relationEnum = pgEnum("relation_type", ["Father", "Husband"]);

export const crimes = pgTable("crimes", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  mobFileNo: varchar("mobFileNo", { length: 256 }),
  hsNo: varchar("hsNo", { length: 256 }),
  hsOpeningDate: timestamp("hsOpeningDate"),
  hsClosingDate: timestamp("hsClosingDate"),
  typeOfCrime: varchar("typeOfCrime", { length: 256 }).notNull(),
  sectionOfLaw: varchar("sectionOfLaw", { length: 256 }).notNull(),
  aliases: text("aliases"),
  ageWhileOpening: varchar("ageWhileOpening", { length: 256 }),
  crimeGroup: varchar("crimeGroup", { length: 256 }),
  crimeHead: varchar("crimeHead", { length: 256 }),
  crimeClass: varchar("crimeClass", { length: 256 }),
  briefFact: text("briefFact"),
  cluesLeft: text("cluesLeft"),
  languagesKnown: text("languagesKnown"),
  languagesUsed: text("languagesUsed"),
  placeAttacked: text("placeAttacked"),
  placeOfAssemblyAfterOffence: text("placeOfAssemblyAfterOffence"),
  placeOfAssemblyBeforeOffence: text("placeOfAssemblyBeforeOffence"),
  propertiesAttacked: text("propertiesAttacked"),
  styleAssumed: text("styleAssumed"),
  toolsUsed: text("toolsUsed"),
  tradeMarks: text("tradeMarks"),
  transportUsedAfter: text("transportUsedAfter"),
  transportUsedBefore: text("transportUsedBefore"),
  gang: gangEnum("isGang").notNull(),
  gangStrength: varchar("gangStrength", { length: 256 }),
  createdBy: bigint("createdBy", { mode: "number" })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const crimesRelations = relations(crimes, ({ one, many }) => ({
  creator: one(users, {
    fields: [crimes.createdBy],
    references: [users.id],
  }),
  criminals: many(crimesByCriminals),
}));
