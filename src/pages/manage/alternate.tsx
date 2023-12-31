import PagesNavbarComponent from "@smartindia/components/navbar/manage";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AuthProvider from "@smartindia/components/AuthHook";


export default function Handler() {
    const { theme, setTheme } = useTheme();
    const [bg, setBg] = useState("");
    useEffect(() => {
        if (theme === "dark") {
            setBg("bg-zinc-950");

        } else {
            setBg("bg-white");
        }
    }, [theme]);
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
                            />
                            <section className="text-2xl font-semibold tracking-tight">
                                Date of Filing
                            </section>
                            <input
                                type="date"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                            />
                            <section className="text-2xl font-semibold tracking-tight">
                                Number of completed hearings
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the number of completed hearings"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                            />
                            <section className="text-2xl font-semibold tracking-tight">
                                Number of adjournments
                            </section>
                            <input
                                type="number"
                                placeholder="Enter the number of adjournments"
                                className="w-full h-12 p-2 rounded-md my-2 border"
                            />
                        </section>
                    </main>
                    <main className="w-1/2 px-4 py-8">
                        <section className="text-2xl font-semibold tracking-tight">
                            Number of sections appealing under
                        </section>
                        <input
                            type="number"
                            placeholder="Enter your case ID here"
                            className="w-full h-12 p-2 rounded-md my-2 border"
                        />
                        <section className="text-2xl font-semibold tracking-tight">
                            Number of listed precedents
                        </section>
                        <input
                            type="number"
                            className="w-full h-12 p-2 rounded-md my-2 border"
                        />
                        <section className="text-2xl font-semibold tracking-tight">
                            Representative case complexity
                        </section>
                        <input
                            type="text"
                            placeholder="Enter the number of completed hearings"
                            className="w-full h-12 p-2 rounded-md my-2 border"
                        />
                        <section className="text-2xl font-semibold tracking-tight">
                            Number of Advocates appearing (Respondent's side)
                        </section>
                        <input
                            type="number"
                            placeholder="Enter the number of respondent side advocates"
                            className="w-full h-12 p-2 rounded-md my-2 border"
                        />
                        <section className="flex w-full justify-end items-center">
                            <button className="bg-neutral-200 text-stone-950 px-6 py-2 text-lg font-semibold tracking-tight rounded-md">
                                Save
                            </button>
                        </section>
                    </main>
                </section>
                <section className="px-8 py-16">
                    <section className="font-extrabold tracking-tight text-4xl">Modify CaseFlow</section>
                    <section className="py-8">
                        <table className='w-full justify-between rounded-md border'>
                            <thead>
                                <tr className='border-b-[1px] rounded'>
                                    <th className='px-4 py-2'>ID</th>
                                    <th className='px-4 py-2'>Case Type</th>
                                    <th className='px-4 py-2'>Case Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b-[1px] text-center self-center bg-rose-300 light:bg-red-300'>
                                    <td className='px-4 py-2'>1</td>
                                    <td className='px-4 py-2'>Criminal</td>
                                    <td className='px-4 py-2'>1234</td>
                                </tr>
                                <tr className='border-b-[1px] text-center self-center'>
                                    <td className='px-4 py-2'>2</td>
                                    <td className='px-4 py-2'>Traffic Violation</td>
                                    <td className='px-4 py-2'>5678</td>
                                </tr>
                                <tr className='border-b-[1px] text-center self-center'>
                                    <td className='px-4 py-2'>3</td>
                                    <td className='px-4 py-2'>Assault</td>
                                    <td className='px-4 py-2'>9876</td>
                                </tr>
                                <tr className='border-b-[1px] text-center self-center'>
                                    <td className='px-4 py-2'>4</td>
                                    <td className='px-4 py-2'>Burglary</td>
                                    <td className='px-4 py-2'>5432</td>
                                </tr>
                                <tr className='border-b-[1px] text-center self-center'>
                                    <td className='px-4 py-2'>5</td>
                                    <td className='px-4 py-2'>Fraud</td>
                                    <td className='px-4 py-2'>8765</td>
                                </tr>
                                <tr className='border-b-[1px] text-center self-center'>
                                    <td className='px-4 py-2'>6</td>
                                    <td className='px-4 py-2'>Robbery</td>
                                    <td className='px-4 py-2'>4321</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </section>
            </section>
        </AuthProvider>
    );
}
