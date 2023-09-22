import type { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ThemeButton from "@smartindia/components/themes/button"

const Profile: NextPage = () : JSX.Element => {
        const { theme, setTheme } = useTheme();
        const [background, setBackground] = useState("");
        const [btnBackground, setBtnBackground] = useState("");
        useEffect(() => {
            if (theme === "light") {
                setBackground("bg-zinc-950 text-white");
                setBtnBackground("bg-black")
            }
    
            if (theme === "dark") {
                setBackground("bg-slate-50 text-black");
                setBtnBackground("bg-sky-500")
            }
        }, [theme]);

    return (
        
        <ThemeProvider>
        <ThemeButton />
        <div className={`flex justify-between items-center w-half flex-row`}>
            <div className="absolute left-[46px] text-[36px] capitalize font-extrabold">
                CaseFlowPro
            </div>
            <div className="ml-auto flex-row text-base space-x-4">
                <button className = "b1">Manage</button>
                <button className = "b2">Alerts</button>
                <button className = "b3">Profile</button>
                <div className={`rounded-xl ${btnBackground} shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] box-border border-[1px] border-solid border-black inline-block`}>
                    <button className="capitalize flex items-center justify-center px-4 py-2 text-base text-white">
                        Signout
                    </button>
                </div>
            </div>
        </div>
    
        <div className = "flex flex-row gap-7">
            <div className = "flex flex-col gap-10 border-r-2 border-slate-200 px-4 w-[30%]">
                <div>
                    <div className="font-bold">Name</div>
                    <div className="box-border h-10% bg-[#D9D9D9]">HElloName</div>
                </div>
                <div>
                    <div className="font-bold">Alma Mater</div>
                    <div className="box-border h-10% bg-[#D9D9D9]">Eg:Alma mater</div>
                </div>
                <div>
                    <div  className="font-bold">Current Tenure</div>
                    <div className="box-border h-10% bg-[#D9D9D9] rounded-lg">EG:current tenure</div>
                </div>
            </div>  
            
            <div className = "flex flex-col gap-10 px-2 w-[30%]">
                <div>
                    <div className="font-bold">Your Preferred Title</div>
                    <div className="box-border h-10% bg-[#D9D9D9]">Honourable</div>
                </div>
                <div>
                    <div className="font-bold">Your mail</div>
                    <div className="box-border h-10% bg-[#D9D9D9]">eeee@gov.in</div>
                </div>
            </div>
        </div>      

        <div>
            
        </div>

       
        </ThemeProvider>
    );
};

export default Profile;
