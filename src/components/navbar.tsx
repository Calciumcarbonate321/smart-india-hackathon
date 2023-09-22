import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeButton from "./themes/button";

export default function NavbarComponent(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [background, setBackground] = useState("");
  useEffect(() => {
    if (theme === "light") {
      setBackground("bg-[#1F2937] text-white");
    }

    if (theme === "dark") {
      setBackground("bg-sky-800 text-white");
    }
  }, [theme]);

  const router = useRouter();

  return (
    <nav className="h-16 px-4 py-8 flex justify-between items-center">
      <section className="font-extrabold -tracking-[0.035em] text-2xl leading-tight">
        CaseFlowPro
      </section>
      <section className="flex gap-4 justify-between items-center">
        <ThemeButton />
        <section
          className={`px-6 py-2 rounded-lg ${background} text-white font-bold text-lg -tracking-[0.05em]`}
        >
          <button
            onClick={() => {
              router.push("/auth/loginP");
            }}
          >
            Login
          </button>
        </section>
      </section>
    </nav>
  );
}
