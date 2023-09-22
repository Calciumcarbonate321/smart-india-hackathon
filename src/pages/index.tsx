'use client'
import HeroComponent from "@smartindia/components/hero";
import NavbarComponent from "@smartindia/components/navbar/navbar";
import supabase from "@smartindia/components/supabase";
import TechStackComponent from "@smartindia/components/tech";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const { theme, setTheme } = useTheme();
  const [bg, setBg] = useState<string>("");

  useEffect(() => {
    if (theme === "dark" || theme === "system") {
      setBg("bg-zinc-950");
    } else if (theme === "light") {
      setBg("bg-slate-200");
    }
  }, [theme])

  const router = useRouter()
  useEffect(
    () => {
      const CheckLogin = async () => {
        const ses = await supabase.auth.getSession();
        if (ses.data.session) {
          router.push('/dashboard');
        }
      };
      CheckLogin();
      setLoading(false);
    },
    [supabase],
  );
  if (loading === false) {
    return (
      <>
        <section className={"min-h-screen " + bg}>
          <NavbarComponent />
          <HeroComponent />
        </section>
        <TechStackComponent />
      </>
    );
  }
}

