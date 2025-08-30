import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FontProvider } from "@/contexts/FontProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FontProvider>
      <Component {...pageProps} />
      <Toaster />
    </FontProvider>
  );
}
