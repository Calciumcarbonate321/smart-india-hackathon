import HeroComponent from "@smartindia/components/hero";
import NavbarComponent from "@smartindia/components/navbar";

export default function Home() {
  return (
    <section className="min-h-screen dark:bg-zinc-950">
      <NavbarComponent/>
      <HeroComponent/>
    </section>
  );
}
