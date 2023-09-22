import { GoSun, GoMoon } from "react-icons/go";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const ChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button onClick={ChangeTheme}>
      {theme === "light"
        ? <GoMoon className="text-2xl" />
        : <GoSun className="text-2xl" />}
    </button>
  );
}
