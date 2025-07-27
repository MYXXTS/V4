import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
import { GROUP_KEYS } from "@zhblogs/constants/groups";
import { IDENTITY_KEYS } from "@zhblogs/constants/identities";

const blogs = defineCollection({
  loader: glob({
    pattern: ["**/*.mdx", "**/*.md"],
    base: "../../contents/blogs",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    create_time: z.date(),
    tags: z.array(z.string()),
    category: z.string(),
    editors: z.array(reference("editor")),
    groups: z.array(reference("group")),
  }),
});

const docs = defineCollection({
  loader: glob({
    pattern: ["**/*.mdx", "**/*.md"],
    base: "../../contents/docs",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    create_time: z.date(),
    editors: z.array(reference("editor")),
    groups: z.array(reference("group")),
  }),
});

const editor = defineCollection({
  loader: file("../../contents/editors.json"),
  schema: z.object({
    id: z.string(), // GitHub 用户名，用于获取头像和Github（个人页面中 URL 地址显示的用户名）
    description: z.string(), // 个人简介
    group: z.array(z.enum(GROUP_KEYS as [string])), // 身份组
    identity: z.enum(IDENTITY_KEYS as [string]), // 身份标识
    url: z.string().url().optional(), // 个人网站网址
    nickname: z.string().optional(), // 昵称，如果不填写则使用 GitHub 用户名
    join_time: z
      .string()
      .transform((str) => new Date(str))
      .optional(), // 加入时间
    leave_time: z
      .string()
      .transform((str) => new Date(str))
      .optional(), // 离开时间
  }),
});

const group = defineCollection({
  loader: file("../../contents/groups.json"),
  schema: z.object({
    id: z.enum(GROUP_KEYS as [string]), // 组唯一标识符
    name: z.string(), // 组名称
    description: z.string(), // 组描述
  }),
});

export const collections = {
  blogs,
  docs,
  editor,
  group,
};
