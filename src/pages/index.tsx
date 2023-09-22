'use client'
import HeroComponent from "@smartindia/components/hero";
import NavbarComponent from "@smartindia/components/navbar";
import supabase from "@smartindia/components/supabase";
import TechStackComponent from "@smartindia/components/tech";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
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
        <section className="min-h-screen dark:bg-zinc-950">
          <NavbarComponent />
          <HeroComponent />
        </section>
        <TechStackComponent />
      </>
    );
  }
}

