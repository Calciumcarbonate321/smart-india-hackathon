'use client'
import supabase from "@smartindia/components/supabase";
import ThemeButton from "@smartindia/components/themes/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineGoogle } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';




export default function Login() {
    const { theme, setTheme } = useTheme();
    const [darkBox, setDarkBox] = useState("");
    const [word, setWord] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter()

    useEffect(
        () => {
            if (theme === 'dark' || theme === 'system') {
                setDarkBox("bg-zinc-800 shadow-md shadow-slate-500")
                setWord('light')
            } else if (theme === 'light') {
                setDarkBox('bg-gray-300 drop-shadow-md')
                setWord('dark')
            }
        }, [theme]
    )
    const LoginWithSupa = async (username: string, password: string) => {

        const res = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        })
        if (res.error) {
            console.log(res.error.message)
        }

        if (res.data.user?.aud === 'authenticated') {
            router.push("/dashboard")
        }
    }

    useEffect(
        () => {
            const CheckLogin = async () => {
                const ses = await supabase.auth.getSession();
                if (ses.data.session) {
                    router.push('/dashboard');
                }
            };
            CheckLogin();
            setLoading(false);
        },
        [supabase],
    );

    if (loading) {
        return (<>...Loading</>)
    }

    return (
        <section className="min-h-screen dark:bg-zinc-950 flex flex-col items-center">
            <section className="py-2 font-extrabold text-center -tracking-[0.035em] text-3xl leading-tight">
                CaseFlowPro
            </section>
            <section className={`m-4 w-1/2 flex flex-col h-full ${darkBox} rounded-lg shadow-md`}>
                <section className="flex justify-center w-full items-center text-3xl font-semibold uppercase tracking-tight py-8">Login</section>
                <section className="px-4 py-8">
                    <section className="font-semibold text-2xl tracking-tight py-2">E-Mail</section>
                    <input className="px-2 w-full rounded-md h-12" type='text' placeholder="Enter your EMAIL" onChange={(e) => setUsername(e.target.value)} />
                    <section className="font-semibold text-2xl tracking-tight py-2">Password</section>
                    <input className="px-2 w-full rounded-md h-12" type='password' placeholder={"Shush! Your password is a secret"} onChange={(e) => setPassword(e.target.value)} />
                </section>
                <button className="px-4 flex items-center gap-4" onClick={() => router.push("./signup")}>
                    <BiLogInCircle className='text-2xl' /><section className="text-lg">Signup</section>
                </button>
                <section className="flex justify-between w-full p-4">
                    <section className="flex items-center gap-2">
                        <ThemeButton />
                        Change to {word} theme
                    </section>
                    <button className="bg-sky-800 px-6 py-1 font-semibold text-xl rounded-md text-white" onClick={async () => LoginWithSupa(username, password)}>Login</button>
                </section>
                <button className="p-4" onClick={async () => { await supabase.auth.signInWithOAuth({ provider: 'google' }) }}>
                    <section className={"py-2 flex items-center justify-center gap-2 w-full rounded-md border " + (theme === 'light' ? 'border-slate-800 hover:bg-slate-300' : 'border-none hover:bg-slate-200 hover:text-black')}>
                        <section className="text-xl font-semibold tracking-tight">Login with Google</section>
                        <AiOutlineGoogle className='text-2xl' />
                    </section>
                </button>
            </section>
        </section>
    );
}
