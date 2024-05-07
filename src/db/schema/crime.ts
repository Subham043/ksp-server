import { relations } from "drizzle-orm";
import { pgTable, bigserial, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { pgEnum } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { bigint } from "drizzle-orm/pg-core";
import { criminals } from "./criminal";

export const gangEnum = pgEnum("isGang", ["Yes", "No"]);
export const relationEnum = pgEnum("relation_type", ["Father", "Husband"]);

export const crimes = pgTable("crimes", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  mobFileNo: varchar("mobFileNo", { length: 256 }),
  hsNo: varchar("hsNo", { length: 256 }),
  hsOpeningDate: timestamp("hsOpeningDate").defaultNow(),
  hsClosingDate: timestamp("hsClosingDate").defaultNow(),
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
  voice: text("voice"),
  build: text("build"),
  complexion: text("complexion"),
  teeth: text("teeth"),
  hair: text("hair"),
  eyes: text("eyes"),
  habbits: text("habbits"),
  burnMarks: text("burnMarks"),
  tattoo: text("tattoo"),
  mole: text("mole"),
  scar: text("scar"),
  leucoderma: text("leucoderma"),
  faceHead: text("faceHead"),
  otherPartsBody: text("otherPartsBody"),
  dressUsed: text("dressUsed"),
  beard: text("beard"),
  face: text("face"),
  moustache: text("moustache"),
  nose: text("nose"),
  gang: gangEnum("isGang").notNull(),
  gangStength: varchar("gangStength", { length: 256 }),
  createdBy: bigint("createdBy", { mode: "number" })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  criminal: bigint("criminalId", { mode: "number" })
    .notNull()
    .references(() => criminals.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const crimesRelations = relations(crimes, ({ one }) => ({
  creator: one(users, {
    fields: [crimes.createdBy],
    references: [users.id],
  }),
  criminal: one(criminals, {
    fields: [crimes.criminal],
    references: [criminals.id],
  }),
}));
