import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HeroComponent(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [background, setBackground] = useState("bg-slate-50 text-black");
  useEffect(() => {
    if (theme === "light") {
      setBackground("bg-zinc-950 text-white");
    }

    if (theme === "dark") {
      setBackground("bg-slate-50 text-black");
    }
  }, [theme]);

  const router = useRouter();

  return (
    <>
      <section className="flex flex-col justify-center items-center text-center self-center font-extrabold dark:gradient tracking-[-0.025em] text-7xl pt-48 pb-4 my-4">
        Case flow management Simplified
      </section>
      <section className="flex flex-wrap justify-center text-center tracking-[-0.025em] font-semibold text-4xl dark:gradient">
        <section className="w-3/5">
          Track your upcoming case listing and set-up priorities and alert
          system
        </section>
      </section>
      <section className="flex justify-center py-6">
        <button onClick={() => router.push("/auth/login")}>
          <section
            className={`rounded-lg px-8 py-2 text-lg ${background} font-normal tracking-[-0.025em] hover:shadow-md hover:shadow-sky-300`}
          >
            Get Started
          </section>
        </button>
      </section>
    </>
  );
}
