import useTheme from "@web/hooks/react/use-theme";
import { Tooltip } from "./tooltip";
import { TablerIcon } from "./tabler-icon";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div onClick={handleThemeToggle}>
      {theme === 'dark' ? (
        <Tooltip content="切换到浅色模式" side="bottom" >
          <TablerIcon iconName="IconSun" />
        </Tooltip>
      ) : (
        <Tooltip content="切换到深色模式" side="bottom" >
          <TablerIcon iconName="IconMoon" />
        </Tooltip>
      )}
    </div>
  );
}
