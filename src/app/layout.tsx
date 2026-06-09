import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const LOGO = 'https://res.cloudinary.com/dkqbzwicr/image/upload/q_auto/f_auto/v1780297080/porfoliologo_ubnb3l.png';

export const metadata: Metadata = {
  title: "Narendra · Full-Stack AI / SaaS Engineer",
  description:
    "Narendra — Full-Stack AI / SaaS Engineer building agentic systems, automation platforms and intelligent products.",
  icons: {
    icon: LOGO,
    shortcut: LOGO,
    apple: LOGO,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${plusJakarta.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(!sessionStorage.getItem('intro_seen'))document.documentElement.style.visibility='hidden';}catch(e){}})();` }} />
        {children}
      </body>
    </html>
  );
}
