import { Link } from "./link";
import useTheme from "@web/hooks/react/use-theme";
import { cn } from "@web/libs/utils";
import light from "@web/assets/light.svg";
import night from "@web/assets/night.svg";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === 'light' ? light.src : night.src;

  return (
    <Link href="/">
      <img
        src={src}
        alt="logo"
        className={cn("size-10", className)}
      />
    </Link>
  );
}
