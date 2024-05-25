import { relations } from "drizzle-orm";
import {
  pgTable,
  bigserial,
  uniqueIndex,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { pgEnum } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { bigint } from "drizzle-orm/pg-core";
import { crimesByCriminals } from "./crimesByCriminals";

export const sexEnum = pgEnum("gender", ["Male", "Female", "Others"]);
export const relationEnum = pgEnum("relation_type", [
  "Father",
  "Husband",
  "Mother",
  "Wife",
]);

export const criminals = pgTable(
  "criminals",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    sex: sexEnum("gender").notNull(),
    dob: timestamp("dob"),
    permanent_address: text("permanent_address"),
    present_address: text("present_address"),
    phone: varchar("phone", { length: 256 }),
    aadhar_no: varchar("aadhar_no", { length: 256 }),
    aadhar_photo: varchar("aadhar_photo", { length: 256 }),
    photo: varchar("photo", { length: 256 }),
    relation_name: varchar("relation_name", { length: 256 }),
    relation_type: relationEnum("relation_type").default("Father"),
    caste: varchar("caste", { length: 256 }),
    fpb_sl_no: varchar("fpb_sl_no", { length: 256 }),
    fpb_classn_no: varchar("fpb_classn_no", { length: 256 }),
    occupation: varchar("occupation", { length: 256 }),
    educational_qualification: varchar("educational_qualification", {
      length: 256,
    }),
    native_ps: varchar("native_ps", { length: 256 }),
    native_district: varchar("native_district", { length: 256 }),
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
    createdBy: bigint("createdBy", { mode: "number" })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (criminals) => {
    return {
      aadharNoIndex: uniqueIndex("aadhar_no_idx").on(
        criminals.id,
        criminals.aadhar_no
      ),
    };
  }
);

export const criminalsRelations = relations(criminals, ({ one, many }) => ({
  creator: one(users, {
    fields: [criminals.createdBy],
    references: [users.id],
  }),
  crimes: many(crimesByCriminals),
}));
