import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiOutlineGoogle } from 'react-icons/ai';
import { FaReact } from 'react-icons/fa';
import { SiPostgresql, SiTailwindcss, SiSupabase } from "react-icons/si";
import { TbBrandNextjs } from 'react-icons/tb';

export default function TechStackComponent(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [background, setBackground] = useState("");
  useEffect(() => {
    if (theme === "light") {
      // setBackground("bg-zinc-950 text-white");
      setBackground("bg-slate-50 text-black");
    }

    if (theme === "dark" || theme === "system") {
      // setBackground("bg-slate-50 text-black");s
      setBackground("bg-zinc-950 text-white");
    }
  }, [theme]);

  return (
    <main className={"min-h-screen flex flex-col items-center justify-center " + background} id="TechStack">
      <section className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Tech Stack
        </h2>
        <p className="max-w-[85%] leading-normal text-xl py-2">
          This project is made using with Next.js, Typescript, TailwindCSS, React, Prisma and Supabase (PostgreSQL)! To implement
          our solution serverless, we use <em>Supabase</em>.
        </p>
      </section>
      <section className="py-4 mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <section className="relative overflow-hidden rounded-lg border bg-background p-2">
          <section className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <TbBrandNextjs className='text-4xl' />
            <section className="space-y-2">
              <h3 className="font-bold">Next.js 13</h3>
              <p className="text-sm">
                Pages directory, Routing, Layouts.
              </p>
            </section>
          </section>
        </section>
        <section className="relative overflow-hidden rounded-lg border bg-background p-2">
          <section className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <FaReact className='text-4xl' />
            <section className="space-y-2">
              <h3 className="font-bold">React 18</h3>
              <p className="text-sm">Server and Client Components. Use hook.</p>
            </section>
          </section>
        </section>
        <section className="relative overflow-hidden rounded-lg border bg-background p-2">
          <section className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <SiPostgresql className='text-4xl' />
            <section className="space-y-2">
              <h3 className="font-bold">Database</h3>
              <p className="text-sm ">
                Developed using PostgreSQL
              </p>
            </section>
          </section>
        </section>
        <section className="relative overflow-hidden rounded-lg border bg-background p-2">
          <section className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <SiTailwindcss className='text-4xl' />
            <section className="space-y-2">
              <h3 className="font-bold">Components</h3>
              <p className="text-sm ">
                Styled using Tailwind
              </p>
            </section>
          </section>
        </section>
        <section className="relative overflow-hidden rounded-lg border bg-background p-2">
          <section className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <AiOutlineGoogle className='text-4xl' />
            <section className="space-y-2">
              <h3 className="font-bold">Authentication</h3>
              <p className="text-sm ">
                We support Google Authentication as well!
              </p>
            </section>
          </section>
        </section>
        <section className="relative overflow-hidden rounded-lg border bg-background p-2">
          <section className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <SiSupabase className='text-4xl' />
            <section className="space-y-2">
              <h3 className="font-bold">Supabase</h3>
              <p className="text-sm ">
                Allows us to implement Auth, Storage and Blob serverlessly!
              </p>
            </section>
          </section>
        </section>
      </section>
      <section className="py-4 first-letter:mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal py-2 sm:text-lg sm:leading-7">
          This website was designed by Abhijith, Harshit, Sinchan, Anvesha, Visnu, Sam, and Sai Kumar!
        </p>
      </section>
    </main>
  );
}
