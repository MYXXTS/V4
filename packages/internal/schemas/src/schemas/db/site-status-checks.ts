import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { Sites } from "./sites";
import { site_status_enum } from "./enums";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod/v4";

export const SiteStatusChecks = pgTable(
  "site_status_checks",
  {
    id: uuid()
      .primaryKey()
      .$default(() => v7()),
    site_id: uuid().references(() => Sites.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    site_status: site_status_enum().notNull(),
    message: varchar({ length: 256 }).notNull(),
    duration: integer().notNull(),
    ping: integer().notNull(),
    check_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("site_status_checks_id_index").on(table.id),
    index("site_status_checks_site_id_index").on(table.site_id),
    index("site_status_checks_site_id_check_time_index").on(
      table.site_id,
      table.check_time.desc()
    ),
    index("site_status_checks_status_time_index").on(
      table.site_status,
      table.check_time.desc()
    ),
    index("site_status_checks_status_duration_time_index").on(
      table.site_status,
      table.duration.desc(),
      table.check_time.desc()
    ),
    index("site_status_checks_site_status_duration_index").on(
      table.site_id,
      table.site_status,
      table.duration.desc()
    ),
  ]
);

export const SiteStatusCheckSelectSchema = createSelectSchema(SiteStatusChecks);
export const SiteStatusCheckInsertSchema = createInsertSchema(SiteStatusChecks);
export const SiteStatusCheckUpdateSchema = createUpdateSchema(SiteStatusChecks);

export type SiteStatusCheckSelect = z.infer<typeof SiteStatusCheckSelectSchema>;
export type SiteStatusCheckInsert = z.infer<typeof SiteStatusCheckInsertSchema>;
export type SiteStatusCheckUpdate = z.infer<typeof SiteStatusCheckUpdateSchema>;
