/**
 * @file site-to-tags-connection-types.ts
 * @description 定义博客站点与标签连接类型常量
 */

export enum SITE_TO_TAGS_CONNECTION_TYPES {
  SUBMISSION = "提交表关联",
  MAIN = "博客主表关联",
}

export const SITE_TO_TAGS_CONNECTION_TYPE_KEYS = Object.keys(SITE_TO_TAGS_CONNECTION_TYPES) as (keyof typeof SITE_TO_TAGS_CONNECTION_TYPES)[];
