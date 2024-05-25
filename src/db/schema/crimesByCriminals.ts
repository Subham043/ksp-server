import { relations } from "drizzle-orm";
import { pgTable, timestamp } from "drizzle-orm/pg-core";
import { bigint } from "drizzle-orm/pg-core";
import { criminals } from "./criminal";
import { crimes } from "./crime";
import { primaryKey } from "drizzle-orm/pg-core";

export const crimesByCriminals = pgTable(
  "crimesByCriminals",
  {
    criminalId: bigint("criminalId", { mode: "number" })
      .notNull()
      .references(() => criminals.id, { onDelete: "cascade" }),
    crimeId: bigint("crimeId", { mode: "number" })
      .notNull()
      .references(() => crimes.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.criminalId, t.crimeId] }),
  })
);

export const crimesByCriminalsRelations = relations(
  crimesByCriminals,
  ({ one }) => ({
    crime: one(crimes, {
      fields: [crimesByCriminals.crimeId],
      references: [crimes.id],
    }),
    criminal: one(criminals, {
      fields: [crimesByCriminals.criminalId],
      references: [criminals.id],
    }),
  })
);
