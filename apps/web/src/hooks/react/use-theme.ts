import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useTheme() {
  const [themeAttr, setThemeAttr] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme as Theme;
      }
      const sysTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return sysTheme ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("theme", themeAttr);
    document.documentElement.setAttribute("data-theme", themeAttr);

    const handleCustomThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== themeAttr) {
        localStorage.setItem("theme", customEvent.detail);
        document.documentElement.setAttribute("data-theme", customEvent.detail);
        setThemeAttr(customEvent.detail);
      }
    };

    document.addEventListener("theme-changed", handleCustomThemeChange);

    return () => {
      document.removeEventListener("theme-changed", handleCustomThemeChange);
    };
  }, [themeAttr]);

  const setTheme = (theme: Theme) => {
    if (typeof window !== "undefined") {
      document.dispatchEvent(
        new CustomEvent("theme-changed", { detail: theme })
      );
    }
  };

  return {
    theme: themeAttr,
    setTheme,
  };
}
