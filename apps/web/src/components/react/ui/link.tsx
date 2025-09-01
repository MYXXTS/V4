import { TablerIcon } from "./tabler-icon";

interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
  target?: string;
  noopener?: boolean;
  noreferrer?: boolean;
  external_logo?: boolean;
}

export function Link({ className, ...props }: LinkProps) {
  const { href, target, noopener, noreferrer, children, external_logo = false } = props;
  if (href.startsWith("/")) {
    return (
      <a
        className={className}
        href={href}
        target="_self"
      >
        {children}
      </a>
    )
  } else {
    return (
      <a
        className={className}
        href={href}
        target={target || "_blank"}
        rel={`${noopener ? "noopener" : ""} ${noreferrer ? "noreferrer" : ""}`.trim()}
      >
        {external_logo && <TablerIcon iconName="IconExternalLink" />}
        {children}
      </a>
    )
  }
}
