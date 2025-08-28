import { ARCHITECTURE_TYPE_KEYS } from "@zhblogs/constants/architecture-types";
import { SITE_STATUS_TAG_KEYS } from "@zhblogs/constants/site-status-tags";
import { SITE_STATUS_TYPE_KEYS } from "@zhblogs/constants/site-status-types";
import { SITE_TO_TAGS_CONNECTION_TYPE_KEYS } from "@zhblogs/constants/site-to-tags-connection-types";
import { CLAIM_TYPE_KEYS } from "@zhblogs/constants/claim-types";
import { FROM_SOURCE_KEYS } from "@zhblogs/constants/frome-sources";
import { GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS } from "@zhblogs/constants/github-webhook-logs-status-types";
import { SUBMISSION_STATUS_KEYS } from "@zhblogs/constants/submission-status";
import { SUBMISSION_TYPE_KEYS } from "@zhblogs/constants/submission-types";
import { SUBMITTER_TYPE_KEYS } from "@zhblogs/constants/submitter-types";
import { TAG_TYPE_KEYS } from "@zhblogs/constants/tag-types";
import { USER_ROLE_KEYS } from "@zhblogs/constants/user-roles";
import { USER_SOCIAL_ACCOUNT_PROVIDERS_KEYS } from "@zhblogs/constants/user-social-account-provider";
import { pgEnum } from "drizzle-orm/pg-core";

export const architecture_type_enum = pgEnum(
  "architecture_type_enum",
  ARCHITECTURE_TYPE_KEYS as [string]
);

export const site_status_enum = pgEnum(
  "site_status_enum",
  SITE_STATUS_TYPE_KEYS as [string]
);

export const from_source_enum = pgEnum(
  "from_source_enum",
  FROM_SOURCE_KEYS as [string]
);

export const submission_type_enum = pgEnum(
  "submission_type_enum",
  SUBMISSION_TYPE_KEYS as [string]
);

export const submission_status_enum = pgEnum(
  "submission_status_enum",
  SUBMISSION_STATUS_KEYS as [string]
);

export const submitter_type_enum = pgEnum(
  "submitter_type_enum",
  SUBMITTER_TYPE_KEYS as [string]
);

export const user_social_account_provider_enum = pgEnum(
  "user_social_account_provider_enum",
  USER_SOCIAL_ACCOUNT_PROVIDERS_KEYS as [string]
);

export const site_status_tag_enum = pgEnum(
  "site_status_tag_enum",
  SITE_STATUS_TAG_KEYS as [string]
);

export const claimed_by_enum = pgEnum(
  "claimed_by_enum",
  CLAIM_TYPE_KEYS as [string]
);

export const site_to_tags_connection_type_enum = pgEnum(
  "site_to_tags_connection_type_enum",
  SITE_TO_TAGS_CONNECTION_TYPE_KEYS as [string]
);

export const github_webhook_logs_status_type_enum = pgEnum(
  "github_webhook_logs_status_type_enum",
  GITHUB_WEBHOOK_LOGS_STATUS_TYPE_KEYS as [string]
);

export const user_role_enum = pgEnum(
  "user_role_enum",
  USER_ROLE_KEYS as [string]
);

export const tag_type_enum = pgEnum("tag_type_enum", TAG_TYPE_KEYS as [string]);
