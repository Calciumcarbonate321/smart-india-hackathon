import AuthProvider from "@smartindia/components/AuthHook";
import PagesNavbarComponent from "@smartindia/components/navbar/manage";
import supabase from "@smartindia/components/supabase";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface IFormProps {
    caseId: string;
    dateOfFiling: string;
    completedHearings: number;
    adjournments: number;
    advocates: number;
}

const calculate_score = (a: any, total_hearings: number) => {
    const diff_y: number = new Date().getMilliseconds() - new Date(a.date_of_filing).getMilliseconds();
    return (diff_y + a.number_of_completed_hearings + a.number_of_adjournments + a.number_of_advocates) + (total_hearings * 0.2);
};

export default function Handler() {
    const { theme, setTheme } = useTheme();
    const [listings, setListings] = useState<number>();
    const [form, setForm] = useState<IFormProps>({
        caseId: "",
        dateOfFiling: "",
        completedHearings: 0,
        adjournments: 0,
        advocates: 0,
    });

    const HandleCaseCreation = async () => {
        const user_id = (await supabase.auth.getUser()).data.user?.id;
        const { data, error } = await supabase.from("section_one").insert({
            case_id: form.caseId,
            user_id: user_id,
            date_of_filing: form.dateOfFiling,
            number_of_completed_hearings: form.completedHearings,
            number_of_adjournments: form.adjournments,
            number_of_advocates: form.advocates,
        });
        if (error) {
            console.log(error.message);
        }
    };

    const [bg, setBg] = useState("");
    const [data, setData] = useState<IFormProps[]>();

    useEffect(
        () => {
            const fetchData = async () => {
                const { data, error } = await supabase.from('section_one').select('*').eq('user_id', (await supabase.auth.getUser()).data.user?.id);
                if (error) {
                    console.error(error.message);
                }
                setListings(data?.length);
                setData(data!);
            }
            setInterval(() => { fetchData() }, 1000)
        }, [supabase]
    )
    useEffect(() => {
        if (theme === "dark" || theme === "system") {
            setBg("bg-zinc-950");
        } else {
            setBg("bg-white");
        }
    }, [theme]);

    if (data != null) {
        data.sort((a, b) => calculate_score(a, listings!) < calculate_score(b, listings!) ? 1 : -1)
    }

    return (
        <AuthProvider>
            <section className={`min-h-screen ${bg}`}>
                <PagesNavbarComponent />
                <section className="flex">
                    <main className={`px-8 w-1/2 border-r-[1px] border-slate-500 h-fit`}>
                        <section className="py-6 font-extrabold text-6xl tracking-tight">
                            Manage cases
                        </section>
                        <section className="py-4">
                            <section className="text-2xl font-semibold">Case ID</section>
                            <input
                                type="text"
                                placeholder="Enter your case ID here"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({ ...form, caseId: e.target.value });
                                }}
                            />
                            <section className="text-2xl font-semibold">
                                Date of Filing
                            </section>
                            <input
                                type="date"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({ ...form, dateOfFiling: e.target.value });
                                }}
                            />
                            <section className="text-2xl font-semibold">
                                Number of completed hearings
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the number of completed hearings"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        completedHearings: parseInt(e.target.value),
                                    });
                                }}
                            />
                            <section className="text-2xl font-semibold">
                                Number of adjournments
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the number of adjournments"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({ ...form, adjournments: parseInt(e.target.value) });
                                }}
                            />
                            <section className="text-2xl font-semibold">
                                Number of advocates
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the number of adjournments"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({ ...form, advocates: parseInt(e.target.value) });
                                }}
                            />
                        </section>
                        <section className="flex w-full justify-end items-center">
                            <button
                                className="bg-neutral-200 text-stone-950 px-4 py-1 text-lg font-semibold tracking-tight rounded-md"
                                onClick={HandleCaseCreation}
                            >
                                Save
                            </button>
                        </section>
                    </main>
                    <main className="w-1/2 px-4 flex flex-col h-[75vh] justify-center items-center">
                        <table className="w-full justify-between rounded-md border">
                            <thead>
                                <tr className="border-b-[1px] rounded">
                                    <th className="px-4 py-2">Case ID</th>
                                    <th className="px-4 py-2">Date of Filing</th>
                                    <th className="px-4 py-2">Number of completed hearings</th>
                                    <th className="px-4 py-2">Number of adjournments</th>
                                    <th className="px-4 py-2">Number of advocates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item: any) => {
                                        return (
                                            <tr className="border-b-[1px] text-center self-center" key={item.id}>
                                                <td className="px-4 py-2">{item.case_id}</td>
                                                <td className="px-4 py-2">{item.date_of_filing}</td>
                                                <td className="px-4 py-2">{item.number_of_completed_hearings}</td>
                                                <td className="px-4 py-2">{item.number_of_adjournments}</td>
                                                <td className="px-4 py-2">{item.number_of_advocates}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </main>
                </section>
            </section>
        </AuthProvider>
    );
}
