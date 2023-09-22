import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeButton from "./themes/button";

export default function NavbarComponent(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [background, setBackground] = useState("bg-slate-50 text-black");
  useEffect(() => {
    if (theme === "light") {
      setBackground("bg-[#1F2937] text-white");
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
          className={`px-6 py-2 rounded-lg ${background} font-medium text-lg hover:shadow-sm hover:shadow-sky-400`}
        >
          <button
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Login
          </button>
        </section>
      </section>
    </nav>
  );
}
