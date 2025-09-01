
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { Link } from "../ui/link";
import { TablerIcon } from "../ui/tabler-icon";
import buildInfo from "@web/assets/build-info.json";
import type React from "react";
import { cn } from "@web/libs/utils";

interface LinkItem {
  label: string;
  items: {
    name: string;
    path: string;
    blank?: boolean;
  }[];
}

const links: LinkItem[] = [
  {
    label: "快速访问",
    items: [
      { name: "博客列表", path: "/list" },
      { name: "数据统计", path: "/charts" },
      { name: "随机跳转", path: "/random", blank: true },
      { name: "项目文档", path: "/docs" },
      { name: "项目博客", path: "/blog" },
      { name: "关于我们", path: "/about" },
    ],
  },
  {
    label: "友情链接",
    items: [
      {
        name: "开往",
        path: "https://www.travellings.cn/",
      },
      {
        name: "博友圈",
        path: "https://www.boyouquan.com/",
      },
      {
        name: "BlogFinder",
        path: "https://bf.zzxworld.com/",
      },
      {
        name: "中文独立博客列表",
        path: "https://github.com/timqian/chinese-independent-blogs",
      },
      {
        name: "优秀个人独立博客导航",
        path: "http://www.jetli.com.cn/",
      },
    ],
  },
];


const SocialLinks: {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentProps<typeof TablerIcon>['iconName'];
}[] = [
    {
      label: "Github",
      description: "查看我们的 Github 组织",
      icon: "IconBrandGithub",
      href: "https://github.com/zh-blogs"
    },
    {
      label: "Email",
      description: "使用邮箱联系我们",
      icon: "IconMail",
      href: "mailto:contact@mail.zhblogs.net"
    }
  ]

export function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {

  return (
    <footer className={cn("bg-base-200 border-t border-base-300 mt-auto", className)} {...props}>
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Logo and Description Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="text-xl font-bold text-zhblogs-red">集博栈</div>
              <p className="text-sm text-base-content/70 text-center md:text-left">
                尝试链接几乎所有的中文博客
              </p>
            </div>

            {/* Social Links */}

            <div className="flex gap-3">
              {SocialLinks.map((item) => (
                <Link
                  href={item.href}
                  className="p-3 rounded-full hover:bg-base-300 transition-colors"
                >
                  <TablerIcon iconName={item.icon} className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Section */}
          {links.map((linkGroup) => (
            <div key={linkGroup.label} className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-base-content mb-4">{linkGroup.label}</h3>
              <nav className="space-y-2">
                {linkGroup.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    target={item.blank ? "_blank" : undefined}
                    className="block text-sm text-base-content/70 hover:text-base-content transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-base-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Copyright */}
            <div className="text-center md:text-left space-y-1">
              <Link
                href="https://beian.miit.gov.cn"
                className="block text-xs text-base-content/60 hover:text-base-content/80 transition-colors"
              >
                陇ICP备 2021003047号-5
              </Link>
              <p className="text-xs text-base-content/60">
                Copyright © 2022 - {new Date().getFullYear()} 集博栈[zhblogs] - All rights reserved.
              </p>
            </div>

            {/* Version Info with Hover Card */}
            <HoverCardPrimitive.Root openDelay={200} closeDelay={300}>
              <HoverCardPrimitive.Trigger asChild>
                <button>
                  <Link
                    href={buildInfo.commitLink}
                    className="text-xs text-base-content/60 hover:text-base-content transition-colors underline decoration-dotted underline-offset-4"
                  >
                    当前程序版本：V4.{buildInfo.version}
                  </Link>
                </button>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Portal>
                <HoverCardPrimitive.Content
                  className="w-[280px] rounded-lg bg-base-100 p-4 shadow-xl border border-base-300 z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                  side="top"
                  align="end"
                  sideOffset={5}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-base-300">
                      <TablerIcon iconName="IconGitCommit" className="size-4 text-base-content/60" />
                      <span className="text-sm font-semibold text-base-content">版本信息</span>
                    </div>
                    <div className="space-y-2 text-xs text-base-content/80 pl-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">版本哈希：</span>
                        <span className="font-mono bg-base-200 px-2 py-1 rounded text-[10px]">
                          {buildInfo.commitHash.slice(0, 8)}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium">提交时间：</span>
                        <div className="text-right text-[10px] leading-tight">
                          <div className="px-2">{new Date(buildInfo.commitTime).toLocaleDateString() + ' ' + new Date(buildInfo.commitTime).toLocaleTimeString()}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium">构建时间：</span>
                        <div className="text-right text-[10px] leading-tight">
                          <div className="px-2">{new Date(buildInfo.buildTime).toLocaleDateString() + ' ' + new Date(buildInfo.buildTime).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-base-300">
                      <Link
                        href={buildInfo.commitLink}
                        target="_blank"
                        className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        <TablerIcon iconName="IconExternalLink" className="size-3" />
                        查看提交详情
                      </Link>
                    </div>
                  </div>
                  <HoverCardPrimitive.Arrow className="fill-base-100" />
                </HoverCardPrimitive.Content>
              </HoverCardPrimitive.Portal>
            </HoverCardPrimitive.Root>
          </div>
        </div>
      </div>
    </footer>
  );
}
