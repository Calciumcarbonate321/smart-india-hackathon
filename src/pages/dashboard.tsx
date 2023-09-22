import AuthProvider from '@smartindia/components/AuthHook';
import supabase from '@smartindia/components/supabase';
import ThemeButton from '@smartindia/components/themes/button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface INavProps {
    title: string;
    link: string;
}
const NavbarButton = (props: INavProps) => {
    return <section>
        <a href={props.link}>
            <section className="text-2xl font-medium hover:underline">{props.title}</section>
        </a>
    </section>
}
export default function Handler() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const HandleSignOut = async () => {
        const res = await supabase.auth.signOut();
        if (res.error) {
            alert(res.error)
        }
        router.push("/")
    }

    useEffect(() => {
        const getName = () => {
            setName("something")
        }
        getName()
    }, [supabase])

    return (
        <AuthProvider>
            <main className="pt-16 px-4">
                <section className="border-b-[1px] flex w-full justify-between items-center pb-6">
                    <section className="font-extrabold -tracking-[1.1] text-4xl leading-tight">
                        Welcome  to CaseFlowPro
                    </section>
                    <section className="flex justify-between items-center gap-6 px-4">
                        <ThemeButton />
                        <NavbarButton title='Manage' link='/manage' />
                        <NavbarButton title='Alerts' link='/alerts' />
                        <NavbarButton title='Profile' link='/profile' />
                        <button className="bg-gray-800 text-white px-6 py-2 text-xl font-bold tracking-tight rounded-md hover:shadow-sm hover:shadow-sky-400" onClick={HandleSignOut}>
                            Signout
                        </button>
                    </section>
                </section>
                <section className='indent-12 font-bold text-3xl'>
                    Hon'ble {name}
                </section>
            </main>
        </AuthProvider>
    )
}