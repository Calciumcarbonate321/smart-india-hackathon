import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ThemeButton from "./themes/button";
import AlertsPopup from "./alerts";

interface NavbarProps {
  buttons: string[]; // Array of button names
}

export default function NavbarComponent({ buttons }: NavbarProps): JSX.Element {
  const alertButtonRef = useRef<HTMLButtonElement | null>(null);
  const { theme, setTheme } = useTheme();
  const [background, setBackground] = useState("bg-slate-50 text-black");
  const [showAlerts, setShowAlerts] = useState(false); // State to control the visibility of the alerts popup

  useEffect(() => {
    if (theme === "light") {
      setBackground("bg-zinc-950 text-white");
    } else {
      setBackground("bg-slate-50 text-black");
    }
  }, [theme]);

  const router = useRouter();
  const getPosition = () => {
    if (alertButtonRef.current) {
      const rect = alertButtonRef.current.getBoundingClientRect();
      const top = rect.top + 50
      return {top:top, left:rect.left};
    }
    return {top:1, left:2};
  };
  // Function to toggle the visibility of the alerts popup
  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
  };

 
  return (
    <nav className="h-16 px-4 py-8 flex justify-between items-center">
      <section className="font-extrabold -tracking-[0.035em] text-2xl leading-tight">
        CaseFlowPro
      </section>
      <section className="flex gap-4 justify-between items-center">
        <ThemeButton />
        {buttons.map((buttonName) => (
          <section
            key={buttonName} // Make sure to set a unique key for each button
          >
            {buttonName === "Alerts" ? (
              // Render a button with an onClick handler for showing/hiding alerts
              <button className={`px-6 py-1 rounded-lg ${!background} font-medium text-lg hover:bg-slate-200`} ref={alertButtonRef} onClick={toggleAlerts}>{buttonName}</button>
            ) : (buttonName === "Login" || buttonName === ("Signout")) ? (
              // Render a button with an onClick handler for showing/hiding alerts
              <button className={`px-6 py-1 rounded-lg ${background} font-medium text-lg hover:shadow-md hover:shadow-sky-400`}>{buttonName}</button>
            ) :(
              // Render other buttons with navigation behavior
              <button className={`px-6 py-1 rounded-lg ${!background} font-medium text-lg hover:bg-slate-200`}
                onClick={() => {
                  router.push(`/auth/${buttonName.toLowerCase()}`);
                }}
              >
                {buttonName}
              </button>
            )}
          </section>
        ))}
        {/* Render the alerts popup conditionally */}
        <AlertsPopup showAlerts={showAlerts} position={getPosition()}/>
      </section>
    </nav>
  );
}
