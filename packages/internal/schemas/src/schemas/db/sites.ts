import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { Architectures } from "./architectures";
import { FeedInfo } from "@/types/schema-types";
import {
  site_status_enum,
  site_status_tag_enum,
  claimed_by_enum,
  from_source_enum,
} from "./enums";
import { Users } from "./users";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod/v4";

export const Sites = pgTable(
  "sites",
  {
    id: uuid()
      .primaryKey()
      .$default(() => v7()),
    bid: varchar({ length: 16 }).unique(),
    name: varchar({ length: 64 }).notNull(),
    url: varchar({ length: 128 }).notNull(),
    sign: varchar({ length: 256 }),
    feed: jsonb().$type<FeedInfo[]>(),
    sitemap: varchar({ length: 256 }),
    link_page: varchar({ length: 256 }),
    architecture: integer().references(() => Architectures.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    join_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow(),
    update_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    from: from_source_enum().array().notNull(),
    site_status: site_status_enum().default("OK"),
    site_status_tags: site_status_tag_enum().array().default([]),
    is_recommend: boolean().notNull().default(false),
    access_count: integer().notNull().default(0),
    owner_id: uuid().references(() => Users.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    is_deleted: boolean().notNull().default(false),
    is_show: boolean().notNull().default(true),
    weight: decimal({ precision: 6, scale: 3 }).notNull().default("0.000"),
    claimed_by: claimed_by_enum(),
  },
  (table) => [
    uniqueIndex("sites_id_index").on(table.id),
    uniqueIndex("sites_bid_index").on(table.bid),
    uniqueIndex("sites_name_index").on(table.name),
    uniqueIndex("sites_url_index").on(table.url),
    uniqueIndex("sites_owner_id_index").on(table.owner_id),
    index("sites_architecture_index").on(table.architecture),
    index("sites_weight_index").on(table.weight),
    index("sites_from_index").on(table.from),
    index("sites_site_status_index").on(table.site_status),
    index("sites_is_recommend_index").on(table.is_recommend),
    index("sites_access_count_index").on(table.access_count),
    index("sites_join_time_index").on(table.join_time.desc()),
    index("sites_is_deleted_index").on(table.is_deleted),
    index("sites_claim_by_index").on(table.claimed_by),
    index("sites_update_time_index").on(table.update_time.desc()),
    uniqueIndex("sites_name_url_index").on(table.name, table.url),
    index("sites_show_status_index").on(table.is_show, table.site_status),
    index("sites_recommendation_status_index").on(
      table.is_recommend,
      table.site_status
    ),
    index("sites_status_tags_index").on(table.site_status_tags),
    index("sites_status_recommendation_weight_index").on(
      table.site_status,
      table.is_recommend,
      table.weight.desc()
    ),
    index("sites_status_recommendation_weight_access_index").on(
      table.site_status,
      table.is_recommend,
      table.weight.desc(),
      table.access_count.desc()
    ),
  ]
);

export const SiteSelectSchema = createSelectSchema(Sites);
export const SiteInsertSchema = createInsertSchema(Sites);
export const SiteUpdateSchema = createUpdateSchema(Sites);

export type SiteSelect = z.infer<typeof SiteSelectSchema>;
export type SiteInsert = z.infer<typeof SiteInsertSchema>;
export type SiteUpdate = z.infer<typeof SiteUpdateSchema>;
