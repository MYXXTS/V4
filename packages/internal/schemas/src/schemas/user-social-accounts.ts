import {
  index,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { Users } from "./users";
import { user_social_account_provider_enum } from "./enums";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod/v4";

export const UserSocialAccounts = pgTable(
  "user_social_accounts",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
    user_id: uuid()
      .notNull()
      .references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    provider: user_social_account_provider_enum().notNull(),
    provider_account_id: varchar({ length: 128 }).unique().notNull(),
    provider_account_username: varchar({ length: 64 }),
    access_token: text().unique().notNull(),
    refresh_token: text().unique(),
    expires_time: integer(),
  },
  (table) => [
    uniqueIndex("user_social_accounts_user_id_provider_account_id_index").on(
      table.user_id,
      table.provider,
      table.provider_account_id
    ),
    index("user_social_accounts_user_id_index").on(table.user_id),
    index("user_social_accounts_provider_index").on(table.provider),
    index("user_social_accounts_expires_time_index").on(table.expires_time),
  ]
);

export const UserSocialAccountSelectSchema =
  createSelectSchema(UserSocialAccounts);
export const UserSocialAccountInsertSchema =
  createInsertSchema(UserSocialAccounts);
export const UserSocialAccountUpdateSchema =
  createUpdateSchema(UserSocialAccounts);

export type UserSocialAccountSelect = z.infer<
  typeof UserSocialAccountSelectSchema
>;
export type UserSocialAccountInsert = z.infer<
  typeof UserSocialAccountInsertSchema
>;
export type UserSocialAccountUpdate = z.infer<
  typeof UserSocialAccountUpdateSchema
>;
