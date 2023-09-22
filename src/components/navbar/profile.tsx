import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../supabase";
import ThemeButton from "../themes/button";
import { useTheme } from "next-themes";

interface INavProps {
    title: string;
    link: string;
}



export default function ProfileNavbarComponent(): JSX.Element {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [bg, setBg] = useState("");
    const [background, setBackground] = useState("");
    const [hover, setHover] = useState("");

    useEffect(() => {
        if (theme === "dark" || theme === "system") {
            setBackground("bg-zinc-950 text-white");
            setBg("bg-neutral-200 text-stone-950");
            setHover('hover:bg-zinc-800')
        } else if (theme === "light") {
            setBackground("bg-slate-50 text-black");
            setBg("bg-slate-950 text-neutral-200");
            setHover('hover:bg-zinc-300')
        }
    }, [theme]);

    const HandleSignOut = async () => {
        const res = await supabase.auth.signOut();
        if (res.error) {
            alert(res.error);
        }
        router.push("/");
    };

    const NavbarComponent = (props: INavProps) => {

        return (
            <section className={`font-semibold text-xl tracking-tight px-2 py-1 rounded-md ` + hover}>
                <a href={props.link}>
                    {props.title}
                </a>
            </section>
        );
    };

    return (
        <nav className={"px-8 py-4 flex justify-between items-center " + background}>
            <a href="/dashboard">
                <section className={`text-2xl font-extrabold p-2 rounded-md ` + (theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-zinc-300')}>
                    CaseFlowPro
                </section>
            </a>
            <section className="flex items-center gap-4">
                <ThemeButton />
                <NavbarComponent title="Profile" link="/profile" />
                <NavbarComponent title="Manage" link="/manage" />
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
