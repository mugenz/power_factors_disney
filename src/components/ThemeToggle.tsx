import { useTheme } from "../theme/ThemeContext";
import { MoonIcon, SunIcon } from "./icons";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isNight ? "Switch to day theme" : "Switch to night theme"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800 dark:text-amber-200 dark:hover:bg-gray-700 dark:shadow-none"
    >
      {isNight ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
