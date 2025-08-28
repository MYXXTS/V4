/**
 * @file site-status-tags.ts
 * @description 博客站点状态标签常量
 */

export enum SITE_STATUS_TAGS {
  EXTERNAL_LIMIT = "外部限制",
  INTERNAL_LIMIT = "内部限制",
  FEW_ARTICLES = "文章较少",
  NO_CONTENT = "无内容",
  NON_ORIGINAL = "非原创",
  SENSITIVE_CONTENT = "敏感内容",
}

export const SITE_STATUS_TAG_KEYS = Object.keys(
  SITE_STATUS_TAGS
) as (keyof typeof SITE_STATUS_TAGS)[];
