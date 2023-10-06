import AuthProvider from "@smartindia/components/AuthHook";
import supabase from "@smartindia/components/supabase";
import ThemeButton from "@smartindia/components/themes/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IFormProps {
    caseId: string;
    caseIdWeight: number;
    dateOfFiling: string;
    dateOfFilingWeight: number;
    completedHearings: number;
    completedHearingsWeight: number;
    adjournments: number;
    adjournmentsWeight: number;
    advocates: number;
    advocatesWeight: number;
}


export interface INavProps {
    title: string;
    link: string;
}

const calculate_score = (a: any, total_hearings: number) => {
    const diff_y: number = new Date().getMilliseconds() - new Date(a.date_of_filing).getMilliseconds();
    return (diff_y + a.number_of_completed_hearings*a.number_of_completed_hearings_wt + a.number_of_adjournments*a.number_of_adjournments_wt + a.number_of_advocates*a.number_of_advocates_wt) + (total_hearings * 0.2);
};

export default function Handler() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [bg, setBg] = useState<string>("");
    const [hov, setHov] = useState('');
    const [listings, setListings] = useState<number>();

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

    const [data, setData] = useState<IFormProps[]>();

    useEffect(
        () => {
            const fetchData = async () => {
                const { data, error } = await supabase.from('section_one').select('*').eq('user_id', (await supabase.auth.getUser()).data.user?.id);
                if (error) {
                    console.log(error.details);
                }
                setListings(data?.length)
                setData(data!);
            }
            setInterval(() => { fetchData() }, 1000)
        }, [supabase]
    )

    const HandleSignOut = async () => {
        const res = await supabase.auth.signOut();
        if (res.error) {
            console.error(res.error);
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

    if (data != null) {
        data.sort((a, b) => calculate_score(a, listings!) < calculate_score(b, listings!) ? 1 : -1)
    }

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
                    <table className="w-full justify-between rounded-md border">
                        <thead>
                            <tr className="border-b-[1px] rounded">
                                <th className="px-4 py-2">Case ID</th>
                                <th className="px-4 py-2">Date of Filing</th>
                                <th className="px-4 py-2">Number of completed hearings</th>
                                <th className="px-4 py-2">Corresponding weightage to vary</th>
                                <th className="px-4 py-2">Number of adjournments</th>
                                <th className="px-4 py-2">Corresponding weightage to vary</th>
                                <th className="px-4 py-2">Number of advocates</th>
                                <th className="px-4 py-2">Corresponding weightage to vary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((item: any) => {
                                    return (
                                        <tr className="border-b-[1px] text-center self-center" key={item.caseId}>
                                            <td className="px-4 py-2">{item.case_id}</td>
                                            <td className="px-4 py-2">{item.date_of_filing}</td>
                                            <td className="px-4 py-2">{item.number_of_completed_hearings}</td>
                                            <td className="px-4 py-2">{item.number_of_completed_hearings_wt}</td>
                                            <td className="px-4 py-2">{item.number_of_adjournments}</td>
                                            <td className="px-4 py-2">{item.number_of_adjournments_wt}</td>
                                            <td className="px-4 py-2">{item.number_of_advocates}</td>
                                            <td className="px-4 py-2">{item.number_of_advocates_wt}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </main>
        </AuthProvider>
    );
}
