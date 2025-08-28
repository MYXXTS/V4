import {
  index,
  integer,
  pgTable,
  primaryKey,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { Sites } from "./sites";
import { Tags } from "./tags";
import { site_to_tags_connection_type_enum } from "./enums";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod/v4";

export const SiteToTags = pgTable(
  "site_to_tags",
  {
    site_id: uuid().references(() => Sites.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    tag_id: integer().references(() => Tags.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    connecrion_type: site_to_tags_connection_type_enum().notNull(),
  },
  (table) => [
    uniqueIndex("site_tags_unique_index").on(table.site_id, table.tag_id),
    index("site_tags_site_index").on(table.site_id),
    index("site_tags_tag_index").on(table.tag_id),
    primaryKey({
      name: "site_tags_pkey",
      columns: [table.site_id, table.tag_id],
    }),
  ]
);

export const SiteToTagSelectSchema = createSelectSchema(SiteToTags);
export const SiteToTagInsertSchema = createInsertSchema(SiteToTags);
export const SiteToTagUpdateSchema = createUpdateSchema(SiteToTags);

export type SiteToTagSelect = z.infer<typeof SiteToTagSelectSchema>;
export type SiteToTagInsert = z.infer<typeof SiteToTagInsertSchema>;
export type SiteToTagUpdate = z.infer<typeof SiteToTagUpdateSchema>;
