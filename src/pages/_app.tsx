import inter from "@smartindia/components/fonts";
import "@smartindia/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} style={inter.style}/>
    </ThemeProvider>
  );
}
