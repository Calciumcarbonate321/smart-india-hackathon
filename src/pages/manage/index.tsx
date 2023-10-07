import AuthProvider from "@smartindia/components/AuthHook";
import PagesNavbarComponent from "@smartindia/components/navbar/manage";
import supabase from "@smartindia/components/supabase";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface IFormProps {
    caseId: string;
    dateOfFiling: string;
    sections: number;
    sc_wt:number;
    adjournments: number;
    adj_wt: number;
    advocates: number;
    adv_wt: number;
    potentialwitness: number;
    pw_wt: number;

}

const calculate_score = (a: any, total_hearings: number) => {
    const diff_y: number = new Date().getMilliseconds() - new Date(a.date_of_filing).getMilliseconds();
    return (diff_y + a.sections*a.sc_wt + a.number_of_adjournments*a.adj_wt + a.number_of_advocates*a.adv_wt+a.potential_witness*a.pw_wt) + (total_hearings * 0.2);
};

export default function Handler() {
    const { theme, setTheme } = useTheme();
    const [listings, setListings] = useState<number>();
    const [form, setForm] = useState<IFormProps>({
        caseId: "",
        dateOfFiling: "",
        sections: 0,
        sc_wt: 0,
        adjournments: 0,
        adj_wt: 0,
        advocates: 0,
        adv_wt: 0,
        potential_witness: 0,
        pw_wt: 0,
    });

    const HandleCaseCreation = async () => {
        const user_id = (await supabase.auth.getUser()).data.user?.id;
        const { data, error } = await supabase.from("section_one").insert({
            case_id: form.caseId,
            user_id: user_id,
            date_of_filing: form.dateOfFiling,
            sections: form.sections,
            sc_wt: form.sc_wt,
            number_of_adjournments: form.adjournments,
            adj_wt: form.adj_wt,
            number_of_advocates: form.advocates,
            adv_wt: form.adv_wt,
            potential_witness: form.potential_witness,
            pw_wt: form.pw_wt,
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
                                Number of Sections appeared
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the number of sections appeared"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        sections: parseInt(e.target.value),
                                    });
                                }}
                            /> 
                            <section className="text-2xl font-semibold">
                                Weight_sections
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the respective weight to it"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        sc_wt: parseInt(e.target.value),
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
                                Weight_adjournment
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the respective weight to it"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        adj_wt: parseInt(e.target.value),
                                    });
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
                             <section className="text-2xl font-semibold">
                                Weight_advocates
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the respective weight to it"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        adv_wt: parseInt(e.target.value),
                                    });
                                }}
                            />
                        </section>
                         <section className="text-2xl font-semibold">
                                No. of Potential Witnesses
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the respective weight to it"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        potential_witness: parseInt(e.target.value),
                                    });
                                }}
                            /> <section className="text-2xl font-semibold">
                                Weight_witness
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the respective weight to it"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        pw_wt: parseInt(e.target.value),
                                    });
                                }}
                            />
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
                                    <th className="px-4 py-2">Sections appeared</th>
{/*                                     <th className="px-4 py-2">Wt_sections</th> */}
                                    <th className="px-4 py-2">Number of adjournments</th>
{/*                                     <th className="px-4 py-2">Wt_adj</th> */}
                                    <th className="px-4 py-2">Number of advocates</th>
{/*                                     <th className="px-4 py-2">Wt_adv</th> */}
                                    <th className="px-4 py-2">Potential Witness</th>
{/*                                     <th className="px-4 py-2">Wt_witness</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item: any) => {
                                        return (
                                            <tr className="border-b-[1px] text-center self-center" key={item.id}>
                                                <td className="px-4 py-2">{item.case_id}</td>
                                                <td className="px-4 py-2">{item.date_of_filing}</td>
                                                <td className="px-4 py-2">{item.sections}</td>
                                                <td className="px-4 py-2">{item.number_of_adjournments}</td>
                                                <td className="px-4 py-2">{item.number_of_advocates}</td>
                                                 <td className="px-4 py-2">{item.potential_witness}</td>
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
