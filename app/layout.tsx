import type { Metadata } from "next";
import "./globals.css";
import "./lenis.css";

export const metadata: Metadata = {
  title: "Funic X — Build AI Products Faster",
  description:
    "Funic X is the AI-native platform that helps teams design, ship, and scale AI products faster. Premium tooling for modern startups.",
  keywords: ["Funic X", "AI platform", "startup tools", "build AI products"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){}else{document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
