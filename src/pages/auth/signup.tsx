'use client'
import supabase from "@smartindia/components/supabase";
import ThemeButton from "@smartindia/components/themes/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";




export default function Login() {
    const { theme, setTheme } = useTheme();
    const [darkBox, setDarkBox] = useState("");
    const [word, setWord] = useState("");
    useEffect(
        () => {
            if (theme === 'dark') {
                setDarkBox("bg-zinc-800 shadow-md shadow-slate-500")
                setWord('light')
            } else {
                setDarkBox('bg-gray-300 drop-shadow-md')
                setWord('dark')
            }
        }, [theme]
    )
    const router = useRouter()

    const SignUpWithSupa = async (username: string, password: string) => {
        const res = await supabase.auth.signUp({
            email: username,
            password: password,
        })
        if (res.error) {
            console.error(res.error.message)
        } else {
            router.push("/dashboard")
        }
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section className="min-h-screen dark:bg-zinc-950 flex flex-col items-center">
            <section className="py-2 font-extrabold text-center -tracking-[0.035em] text-3xl leading-tight">
                CaseFlowPro
            </section>
            <section className={`m-4 w-1/2 flex flex-col h-full ${darkBox} rounded-lg shadow-md`}>
                <section className="flex justify-center w-full items-center text-3xl font-semibold uppercase tracking-tight py-8">SignUp</section>
                <section className="px-4 py-8">
                    <section className="font-semibold text-2xl tracking-tight py-2">E-mail</section>
                    <input className="px-2 w-full rounded-md h-12" type='text' placeholder="Enter your EMAIL" onChange={(e) => setUsername(e.target.value)} />
                    <section className="font-semibold text-2xl tracking-tight py-2">Password</section>
                    <input className="px-2 w-full rounded-md h-12" type='password' placeholder={"Shush! Your password is a secret"} onChange={(e) => setPassword(e.target.value)} />
                </section>
                <section className="flex justify-between w-full p-4">
                    <section className="flex items-center gap-2">
                        <ThemeButton />
                        Change to {word} theme
                    </section>
                    <button className="bg-sky-800 px-6 py-1 font-semibold text-xl rounded-md text-white" onClick={async () => SignUpWithSupa(username, password)}>Signup</button>
                </section>
            </section>
        </section>
    );
}
