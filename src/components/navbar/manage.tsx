import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../supabase";
import ThemeButton from "../themes/button";
import { useTheme } from "next-themes";

interface INavProps {
    title: string;
    link: string;
}

const NavbarComponent = (props: INavProps) => {
    return (
        <section className="font-semibold text-xl tracking-tight">
            <a href={props.link}>
                {props.title}
            </a>
        </section>
    );
};

export default function PagesNavbarComponent(): JSX.Element {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [bg, setBg] = useState("");

    useEffect(() => {
        if (theme === "dark" || theme === "system") {
            setBg("bg-neutral-200 text-stone-950");
        } else if (theme === "light") {
            setBg("bg-slate-950 text-neutral-200");
        }
    }, [theme]);

    const HandleSignOut = async () => {
        const res = await supabase.auth.signOut();
        if (res.error) {
            alert(res.error);
        }
        router.push("/");
    };

    return (
        <nav className="px-8 py-4 flex justify-between items-center">
            <a href="/dashboard">
                <section className={`text-2xl font-extrabold tracking-tight p-2 rounded-md ` + (theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-300')}>
                    CaseFlowPro
                </section>
            </a>
            <section className="flex items-center gap-4">
                <ThemeButton />
                <NavbarComponent title="Profile" link="/profile" />
                <button
                    className={`${bg} px-4 py-1 text-lg font-semibold tracking-tight rounded-md`}
                    onClick={HandleSignOut}
                >
                    Signout
                </button>
            </section>
        </nav>
    );
}
