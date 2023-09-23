import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "./supabase";

interface IAuthProps {
    children: JSX.Element;
}

export default function AuthProvider(props: IAuthProps): JSX.Element {
    const [authState, setAuthState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    useEffect(
        () => {
            const CheckLogin = async () => {
                const ses = await supabase.auth.getSession();
                if (ses.data.session == null) {
                    router.push('/auth/login');
                }
            };
            CheckLogin();
            setLoading(false);
        },
        [supabase],
    );
    
    if (loading === false){
        return <>{props.children}</>;
    }
    return <>...Loading</>
    
}
