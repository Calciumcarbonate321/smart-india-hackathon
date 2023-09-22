'use client'
import AuthProvider from "@smartindia/components/AuthHook";
import HeroComponent from "@smartindia/components/hero";
import NavbarComponent from "@smartindia/components/navbar";
import supabase from "@smartindia/components/supabase";
import { useEffect } from "react";

export default function Home() {
  return (
    <section className="min-h-screen dark:bg-zinc-950">
      <NavbarComponent />
      <HeroComponent />
    </section>
  );
}
