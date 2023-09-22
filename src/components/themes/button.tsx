import { GoSun, GoMoon } from "react-icons/go";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const ChangeTheme = () => {
    if (theme === 'light' || theme === 'system') {
      setTheme('dark')
    }
    else if (theme === 'dark') {
      setTheme('light')
    }
  };
  return (
    <button onClick={ChangeTheme}>
      {theme === "light"
        ? <GoMoon className="text-4xl rounded-full m-1 hover:bg-zinc-200" />
        : <GoSun className="text-4xl rounded-full m-1 p-1 hover:bg-zinc-700" />}
    </button>
  );
}
