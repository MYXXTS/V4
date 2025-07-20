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
import { Blogs } from "./blogs";
import { FeedInfo } from "@/types/schema-types";
import {
  blog_status_enum,
  submission_status_enum,
  submission_type_enum,
  submitter_type_enum,
} from "./enums";
import { Users } from "./users";

export const BlogSubmissions = pgTable(
  "blog_submissions",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
    blog_id: uuid().references(() => Blogs.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    name: varchar({ length: 64 }),
    url: varchar({ length: 128 }),
    sign: varchar({ length: 256 }),
    feed: jsonb().$type<FeedInfo>(),
    sitemap: varchar({ length: 256 }),
    link_page: varchar({ length: 256 }),
    architecture: integer().references(() => Architectures.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    custom_architecture: varchar({ length: 64 }),
    is_recommended: boolean(),
    blog_status: blog_status_enum(),
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
    uniqueIndex("blog_submissions_id_index").on(table.id),
    uniqueIndex("blog_submissions_name_index").on(table.name),
    uniqueIndex("blog_submissions_url_index").on(table.url),
    index("blog_submissions_architecture_index").on(table.architecture),
    index("blog_submissions_blog_status_index").on(table.blog_status),
    index("blog_submissions_recommend_index").on(table.is_recommended),
    index("blog_submissions_email_index").on(table.email),
    index("blog_submissions_ip_index").on(table.ip),
    index("blog_submissions_submit_time_index").on(table.submit_time.desc()),
    index("blog_submissions_review_time_index").on(table.review_time.desc()),
    uniqueIndex("blog_submissions_name_url_index").on(table.name, table.url),
    index("blog_submissions_status_time_index").on(
      table.submission_status,
      table.submit_time.desc()
    ),
    index("blog_submissions_submitter_index").on(table.submitter_id),
    index("blog_submissions_reviewer_index").on(table.reviewer_id),
    index("blog_submissions_type_index").on(table.submission_type),
    index("blog_submissions_submitter_type_index").on(table.submitter_type),
  ]
);
