/**
 * @file site-status-types.ts
 * @description 博客站点状态类型常量
 */

export enum SITE_STATUS_TYPES {
  OK = "状态正常",
  ERROR = "状态异常",
  SSLERROR = "SSL证书错误",
}

export const SITE_STATUS_TYPE_KEYS = Object.keys(SITE_STATUS_TYPES) as (keyof typeof SITE_STATUS_TYPES)[];
