import { useEffect, useState } from "react";
import AuthProvider from "@smartindia/components/AuthHook";
import { useTheme } from "next-themes";
import PagesNavbarComponent from "@smartindia/components/navbar/manage";

import CBHandler from "@smartindia/pages/manage/constibench";
import POHandler  from "@smartindia/pages/manage/pocso";

export default function Manage() {
    const [ po, setpocsoToggle ] = useState<boolean>(true);
    const togglepocso = () => {
        setpocsoToggle(!po);
    }

    return (
        <>
            <PagesNavbarComponent togglepocso = {togglepocso} />
                {po ? (
                    <POHandler />
                ) : (
                    <CBHandler />
                )}
        </>
    )
};
