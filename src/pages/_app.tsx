import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleTagManager } from "@next/third-parties/google";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
    </>
  );
}
