import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 } from "uuid";
import { Sites } from "./sites";
import { isValidUrl } from "@zhblogs/utils/psl";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z, { ZodString } from "zod/v4";

export const SiteFeeds = pgTable(
  "site_feeds",
  {
    id: uuid()
      .primaryKey()
      .$default(() => v7()),
    site_id: uuid().references(() => Sites.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    title: varchar({ length: 128 }).notNull(),
    link: varchar({ length: 2048 }).notNull(),
    description: varchar({ length: 2048 }),
    publish_time: timestamp({ withTimezone: true, precision: 3 }),
    collection_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .$default(() => new Date()),
  },
  (table) => [
    uniqueIndex("site_feeds_id_index").on(table.id),
    index("site_feeds_title_index").on(table.title),
    uniqueIndex("site_feeds_site_id_link_index").on(table.site_id, table.link),
    uniqueIndex("site_feeds_title_link_index").on(table.title, table.link),
    index("site_feeds_site_id_title_index").on(table.site_id, table.title),
    index("site_feeds_publish_time_index").on(table.publish_time.desc()),
    index("site_feeds_collection_time_index").on(table.collection_time.desc()),
    index("site_feeds_site_id_publish_time_index").on(
      table.site_id,
      table.publish_time.desc()
    ),
  ]
);

const siteFeedRefine = {
  link: (schema: ZodString) =>
    schema.refine((value) => {
      return isValidUrl(value);
    }),
};

export const SiteFeedSelectSchema = createSelectSchema(
  SiteFeeds,
  siteFeedRefine
);
export const SiteFeedInsertSchema = createInsertSchema(
  SiteFeeds,
  siteFeedRefine
);
export const SiteFeedUpdateSchema = createUpdateSchema(
  SiteFeeds,
  siteFeedRefine
);

export type SiteFeedSelect = z.infer<typeof SiteFeedSelectSchema>;
export type SiteFeedInsert = z.infer<typeof SiteFeedInsertSchema>;
export type SiteFeedUpdate = z.infer<typeof SiteFeedUpdateSchema>;
