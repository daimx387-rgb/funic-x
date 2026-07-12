"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Magnetic, Reveal } from "@/components/ui/primitives";
import { motion } from "framer-motion";

const cols = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Docs", "API Reference", "Community", "Status", "Security"],
  },
];

const socials = [
  { label: "X", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Discord", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer id="footer" className="section relative bg-mist">
      <div className="container-x">
        {/* CTA band */}
        <Reveal className="mb-20 overflow-hidden rounded-[24px] border border-line bg-paper p-10 sm:p-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-[700px] text-[clamp(2rem,4vw+6px,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Build AI products faster.
            </h2>
            <p className="mt-6 max-w-[520px] text-[clamp(1.125rem,0.6vw+0.9rem,1.25rem)] leading-[1.65] text-ink-soft">
              Start free today. No credit card required. Ship your first pipeline
              in minutes.
            </p>
            <Magnetic strength={0.2} className="mt-8">
              <motion.a
                href="#pricing"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="shine group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-[9999px] bg-ink px-8 text-[16px] font-semibold text-paper shadow-[0_10px_30px_rgba(10,10,10,0.15)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(10,10,10,0.22)]"
              >
                <span className="relative">Get started free</span>
                <ArrowRight className="relative h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Footer body */}
        <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-5">
          {/* Brand + newsletter */}
          <div className="col-span-2">
            <a
              href="#top"
              className="group inline-flex items-center text-[24px] font-semibold tracking-[-0.03em] text-ink"
            >
              Funic
              <span className="ml-1 inline-block font-mono text-[29px] leading-none transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110">
                X
              </span>
            </a>
            <p className="mt-4 max-w-[340px] text-[15px] leading-[1.65] text-ink-soft">
              The AI-native platform for teams who ship. Design, deploy, and
              observe AI products in one place.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-6 max-w-[400px]"
            >
              <label className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-mute">
                Newsletter
              </label>
              <div className="mt-3 flex items-center gap-2.5 rounded-[9999px] border border-line bg-paper p-2.5 pl-6 transition-colors focus-within:border-ink/30">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-mute"
                />
                <button
                  type="submit"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-[9999px] bg-ink text-paper transition-transform duration-300 hover:scale-105 active:scale-95"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-[14px] text-ink"
                >
                  Thanks — you&apos;re on the list.
                </motion.p>
              )}
            </form>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-mute">
                {col.title}
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-[16px] text-ink-soft transition-colors duration-300 hover:text-ink"
                    >
                      {l}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-[14px] text-ink-mute">
            © {new Date().getFullYear()} Funic X. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-[9999px] border border-line bg-paper px-5 py-2.5 text-[14px] font-medium text-ink-soft transition-all duration-300 hover:border-ink hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5 text-[14px] text-ink-mute">
            <a href="#" className="transition-colors hover:text-ink">Privacy</a>
            <a href="#" className="transition-colors hover:text-ink">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
