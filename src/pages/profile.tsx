import AuthProvider from "@smartindia/components/AuthHook";
import ProfileNavbarComponent from "@smartindia/components/navbar/profile";
import supabase from "@smartindia/components/supabase";
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface IDataProps {
    alma_mater: string;
    created_at: string;
    current_tenure: string;
    id?: number;
    name: string;
    photo_url?: string;
    preferred_title: string;
    user_id: string;
}

export default function Profile() {
    const { theme, setTheme } = useTheme();
    const [bg, setBg] = useState<string>("");
    const [data, setData] = useState<IDataProps>()
    const [email, setEmail] = useState<string>("");
    const [button, setButton] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [repw, setRepw] = useState<string>("");
    const [error, setError] = useState<boolean>();
    const [success, setSuccess] = useState<string>("");
    const [profile, setProfile] = useState<string>("");
    const [form, setForm] = useState<IDataProps>({
        alma_mater: "",
        created_at: "",
        current_tenure: "",
        id: 0,
        name: "",
        preferred_title: "",
        user_id: "",
    });



    const HandlePasswordUpdate = async () => {
        if (pw === repw) {
            const user = await supabase.auth.updateUser({ password: pw })
            if (user.error) {
                setError(false)
            }
            else {
                setError(true)
                setSuccess('Password updated successfully!')
            }
        }
        else {
            setSuccess('Passwords do not match!')
        }
    }

    useEffect(() => {
        setBg(theme === "dark" ? "bg-zinc-950" : "");
        if (theme === 'dark') {
            setButton('bg-zinc-50 hover:bg-zinc-200 text-zinc-900')
        }
        else if (theme === 'light') {
            setButton('bg-zinc-900 hover:bg-zinc-800 text-zinc-200')
        }
    }, [theme]);

    useEffect(() => {
        const fetchData = async () => {
            const user = await supabase.auth.getUser();
            const id = user.data.user?.id;
            const { data, error } = await supabase.from('users').select('*').eq('user_id', id).single();
            setData(data)
            setEmail(user.data.user?.email!)
        }
        fetchData()
    }, [supabase])

    const HandleProfileUpdate = async () => {
        const user = await supabase.auth.getUser();
        const id = user.data.user?.id;
        console.log(id)

        const res = await supabase.from('users').select().eq('user_id', `${id}`).single();
        const record_id = res.data.id;

        const { data, error } = await supabase.from('users').update({
            name: form.name,
            alma_mater: form.alma_mater,
            current_tenure: form.current_tenure,
            preferred_title: form.preferred_title
        }).eq('id', `${record_id}`);

        if (error) {
            setProfile(error.details)
            // alert(error);
        }
        setProfile('Profile updated successfully!')

    }


    return (
        <AuthProvider>
            <>
                <ProfileNavbarComponent />
                <main className={`min-h-screen ${bg} py-8`}>
                    <section className="px-8">
                        <section className="text-5xl font-extrabold tracking-tight">
                            Your Profile
                        </section>
                        <section className="py-4 flex gap-8 justify-between items-center">
                            <section className="w-1/3 pr-6 border-r-[1px]">
                                <section className="py-4 text-2xl font-semibold tracking-tight">
                                    Name
                                </section>
                                <input
                                    className="h-12 p-4 w-full rounded-md border"
                                    placeholder={data?.name}
                                    type="textarea"
                                    onChange={(e) => {
                                        setForm({ ...form, name: e.target.value });
                                    }}
                                />
                                <section className="py-4 text-2xl font-semibold tracking-tight">
                                    Alma Mater
                                </section>
                                <input
                                    className="h-12 p-4 w-full rounded-md border"
                                    type="textarea"
                                    placeholder={data?.alma_mater}
                                    onChange={(e) => {
                                        setForm({ ...form, alma_mater: e.target.value });
                                    }}
                                />
                                <section className="py-4 text-2xl font-semibold tracking-tight">
                                    Current Tenure
                                </section>
                                <input
                                    className="h-12 p-4 w-full rounded-md border"
                                    type="textarea"
                                    placeholder={data?.current_tenure}
                                    onChange={(e) => {
                                        setForm({ ...form, current_tenure: e.target.value })
                                    }} />
                            </section>
                            <section className="w-1/3">
                                <section className="py-4 text-2xl font-semibold tracking-tight">
                                    Your preferred title
                                </section>
                                <input
                                    className="h-12 p-4 w-full rounded-md border"
                                    type="textarea"
                                    placeholder={data?.preferred_title}
                                    onChange={(e) => {
                                        setForm({ ...form, preferred_title: e.target.value })
                                    }}
                                />
                                <section className="py-4 text-2xl font-semibold tracking-tight">
                                    Your mail
                                </section>
                                <input
                                    className="h-12 p-4 w-full rounded-md border"
                                    type="textarea"
                                    disabled={true}
                                    placeholder={email}
                                />
                                {
                                    profile ? <section className="py-2 text-xl font-semibold text-green-500">{profile}</section> : <section className="py-2 text-xl font-semibold text-red-500">{profile}</section>
                                }
                                <button className={`${button} px-4 py-2 my-2 rounded-md font-semibold text-lg`} onClick={HandleProfileUpdate}>
                                    Save
                                </button>
                            </section>
                            <section className="w-1/3">
                                <section className="flex flex-col gap-4 items-center">
                                    <img
                                        src={`https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png`}
                                        alt="Profile Picture"
                                        className="rounded-full h-64 w-64"
                                    />
                                </section>
                            </section>
                        </section>
                        <section className="py-8 text-5xl font-extrabold tracking-tight">
                            Your password
                        </section>
                        <section className="">
                            <section className="py-4 text-2xl font-semibold tracking-tight">
                                Enter your new password
                            </section>
                            <input
                                className="h-12 p-4 w-1/2 rounded-md border"
                                placeholder='Shush! Your password is a secret!'
                                type="password"
                                onChange={(e) => setPw(e.target.value)}
                            />
                            <section className="py-4 text-2xl font-semibold tracking-tight">
                                Re-enter your new password
                            </section>
                            <input
                                className="h-12 p-4 w-1/2 rounded-md border"
                                placeholder='Shush! Your password is a secret!'
                                type="password"
                                onChange={(e) => setRepw(e.target.value)}
                            />
                            {error ? <section className="py-2 text-xl font-semibold text-green-500">{success}</section> : <section className="py-2 text-xl font-semibold text-red-500">{success}</section>}
                            <button className={"my-4 w-1/2 flex justify-end items-center p-2 rounded-md font-semibold"} onClick={HandlePasswordUpdate}>
                                <p className={`p-2 rounded-md ` + button}>Change password</p>
                            </button>
                        </section>
                    </section>
                </main>
            </>
        </AuthProvider>
    );
}
