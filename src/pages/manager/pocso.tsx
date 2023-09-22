import NavbarComponent from "@smartindia/components/navbar";

export default function ConstiBench() {
    return(
    <>
      <section className="min-h-screen dark:bg-zinc-950">
        <NavbarComponent buttons={['Alerts', 'Profile', 'Signout']}/>
      </section>
    </>
  );
}

