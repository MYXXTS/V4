import {
  boolean,
  index,
  inet,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { Architectures } from "./architectures";
import { Sites } from "./sites";
import { FeedInfo } from "@/types/schema-types";
import {
  site_status_enum,
  submission_status_enum,
  submission_type_enum,
  submitter_type_enum,
} from "./enums";
import { Users } from "./users";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { isValidUrl } from "@zhblogs/utils/psl";
import { z, ZodString } from "zod/v4";

export const SiteSubmissions = pgTable(
  "site_submissions",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
    site_id: uuid().references(() => Sites.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    name: varchar({ length: 64 }),
    url: varchar({ length: 128 }),
    sign: varchar({ length: 256 }),
    feed: jsonb().$type<FeedInfo[]>(),
    sitemap: varchar({ length: 256 }),
    link_page: varchar({ length: 256 }),
    architecture: integer().references(() => Architectures.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    custom_architecture: varchar({ length: 64 }),
    is_recommended: boolean(),
    site_status: site_status_enum(),
    submit_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow(),
    review_time: timestamp({ withTimezone: true, precision: 3 })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    ip: inet().notNull(),
    user_agent: varchar({ length: 512 }).notNull(),
    email: varchar({ length: 128 }),
    submission_status: submission_status_enum().notNull(),
    submission_type: submission_type_enum().notNull(),
    submitter_type: submitter_type_enum().notNull(),
    reason: varchar({ length: 512 }),
    request: varchar({ length: 512 }),
    submitter_id: uuid().references(() => Users.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    reviewer_id: uuid().references(() => Users.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    uniqueIndex("site_submissions_id_index").on(table.id),
    uniqueIndex("site_submissions_name_index").on(table.name),
    uniqueIndex("site_submissions_url_index").on(table.url),
    index("site_submissions_architecture_index").on(table.architecture),
    index("site_submissions_site_status_index").on(table.site_status),
    index("site_submissions_recommend_index").on(table.is_recommended),
    index("site_submissions_email_index").on(table.email),
    index("site_submissions_ip_index").on(table.ip),
    index("site_submissions_submit_time_index").on(table.submit_time.desc()),
    index("site_submissions_review_time_index").on(table.review_time.desc()),
    uniqueIndex("site_submissions_name_url_index").on(table.name, table.url),
    index("site_submissions_status_time_index").on(
      table.submission_status,
      table.submit_time.desc()
    ),
    index("site_submissions_submitter_index").on(table.submitter_id),
    index("site_submissions_reviewer_index").on(table.reviewer_id),
    index("site_submissions_type_index").on(table.submission_type),
    index("site_submissions_submitter_type_index").on(table.submitter_type),
  ]
);

const siteSubmissionRefine = {
  url: (schema: ZodString) =>
    schema
      .refine((value) => {
        return isValidUrl(value);
      })
      .optional(),
  link_page: (schema: ZodString) =>
    schema
      .refine((value) => {
        return isValidUrl(value);
      })
      .optional(),
  sitemap: (schema: ZodString) =>
    schema
      .refine((value) => {
        return isValidUrl(value);
      })
      .optional(),
};

export const SiteSubmissionSelectSchema = createSelectSchema(
  SiteSubmissions,
  siteSubmissionRefine
);
export const SiteSubmissionInsertSchema = createInsertSchema(
  SiteSubmissions,
  siteSubmissionRefine
);
export const SiteSubmissionUpdateSchema = createUpdateSchema(
  SiteSubmissions,
  siteSubmissionRefine
);

export type SiteSubmissionSelect = z.infer<typeof SiteSubmissionSelectSchema>;
export type SiteSubmissionInsert = z.infer<typeof SiteSubmissionInsertSchema>;
export type SiteSubmissionUpdate = z.infer<typeof SiteSubmissionUpdateSchema>;
