import AuthProvider from "@smartindia/components/AuthHook";
import supabase from "@smartindia/components/supabase";
import ThemeButton from "@smartindia/components/themes/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface INavProps {
    title: string;
    link: string;
}


export default function Handler() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [bg, setBg] = useState<string>("");
    const [hov, setHov] = useState('');

    const { theme, setTheme } = useTheme()

    useEffect(
        () => {
            if (theme === 'dark') {
                setBg('bg-zinc-950')
                setHov('hover:bg-zinc-900')
            } else if (theme === 'light') {
                setBg('bg-slate-200');
                setHov('hover:bg-zinc-100')
            }
        }, [theme]
    )

    const HandleSignOut = async () => {
        const res = await supabase.auth.signOut();
        if (res.error) {
            alert(res.error);
        }
        router.push("/");
    };

    const NavbarButton = (props: INavProps) => {
        return (
            <section>
                <a href={props.link}>
                    <section className={`text-2xl font-medium tracking-tight p-2 rounded-md ${hov}`}>
                        {props.title}
                    </section>
                </a>
            </section>
        );
    };


    useEffect(() => {
        const getName = async () => {
            const user = await supabase.auth.getUser();
            const id = user.data.user?.id;
            const { data, error } = await supabase.from('users').select('name,preferred_title').eq('user_id', id);
            // @ts-ignore
            let parsed_name = data[0].preferred_title + " " + data[0].name
            setName(parsed_name)
        };
        getName();
    }, [supabase]);

    return (
        <AuthProvider>
            <main className={"pt-16 px-4 min-h-screen " + bg}>
                <section className="border-b-[1px] flex w-full justify-between items-center pb-6">
                    <section className="font-extrabold -tracking-[1.1] text-4xl leading-tight">
                        Welcome to CaseFlowPro!
                    </section>
                    <section className="flex justify-between items-center gap-4 px-4">
                        <ThemeButton />
                        <NavbarButton title="Manage" link="/manage" />
                        <NavbarButton title="Profile" link="/profile" />
                        <button
                            className="bg-gray-800 text-white px-6 py-2 text-xl font-bold tracking-tight rounded-md hover:shadow-sm hover:shadow-sky-400"
                            onClick={HandleSignOut}
                        >
                            Signout
                        </button>
                    </section>
                </section>
                <section className="indent-8 font-bold tracking-tight text-3xl">
                    {name}
                </section>
                <section className="flex items-center justify-between w-full px-4">
                    <section className="py-8 font-medium tracking-tight text-xl">
                        Your Listings
                    </section>
                    <section className="p-2">
                        <input
                            className="rounded-md px-2 w-72 b h-8 border dark:border-none"
                            type="text"
                            placeholder="Seach by ID..."
                        />
                    </section>
                </section>
                <section>
                    <table className="table-auto w-full justify-between rounded-md border">
                        <thead>
                            <tr className="border-b-[1px] rounded">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Case Type</th>
                                <th className="px-4 py-2">Case Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b-[1px] text-center self-center">
                                <td className="px-4 py-2">1</td>
                                <td className="px-4 py-2">Criminal</td>
                                <td className="px-4 py-2">1234</td>
                            </tr>
                            <tr className="border-b-[1px] text-center self-center">
                                <td className="px-4 py-2">2</td>
                                <td className="px-4 py-2">Traffic Violation</td>
                                <td className="px-4 py-2">5678</td>
                            </tr>
                            <tr className="border-b-[1px] text-center self-center">
                                <td className="px-4 py-2">3</td>
                                <td className="px-4 py-2">Assault</td>
                                <td className="px-4 py-2">9876</td>
                            </tr>
                            <tr className="border-b-[1px] text-center self-center">
                                <td className="px-4 py-2">4</td>
                                <td className="px-4 py-2">Burglary</td>
                                <td className="px-4 py-2">5432</td>
                            </tr>
                            <tr className="border-b-[1px] text-center self-center">
                                <td className="px-4 py-2">5</td>
                                <td className="px-4 py-2">Fraud</td>
                                <td className="px-4 py-2">8765</td>
                            </tr>
                            <tr className="border-b-[1px] text-center self-center">
                                <td className="px-4 py-2">6</td>
                                <td className="px-4 py-2">Robbery</td>
                                <td className="px-4 py-2">4321</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </AuthProvider>
    );
}
