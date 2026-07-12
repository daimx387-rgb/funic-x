"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/primitives";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });
  const magneticMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - box.left - box.width / 2) * 0.18);
    y.set((e.clientY - box.top - box.height / 2) * 0.22);
  };

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 pt-5"
      style={{ paddingLeft: "var(--space-page)", paddingRight: "var(--space-page)" }}
    >
      <div
        className={cn(
          "relative mx-auto flex h-[60px] items-center justify-between rounded-2xl px-5 transition-all duration-500 md:px-7",
          scrolled
            ? "border border-black/[0.08] bg-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-[16px] dark:border-white/[0.12] dark:bg-white/[0.08] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)] dark:backdrop-blur-[18px]"
            : "border border-transparent bg-transparent"
        )}
        style={{ maxWidth: "var(--width-page)" }}
      >
        {/* Logo */}
        <a
          href="#top"
          className="group relative z-10 inline-flex items-center text-[21px] font-semibold tracking-[-0.03em] text-ink"
        >
          Funic
          <span className="ml-1 inline-block font-mono text-[26px] leading-none transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110">
            X
          </span>
        </a>

        {/* Center links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative rounded-full px-5 py-2.5 text-[16px] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {link.label}
              <span className="absolute bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-ink transition-all duration-300 group-hover:w-5" />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="relative z-10 hidden items-center gap-4 md:flex">
          <a
            href="#"
            className="rounded-full px-5 py-2.5 text-[16px] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
          >
            Sign In
          </a>
          <Magnetic strength={0.25}>
            <motion.a
              href="#pricing"
              onPointerMove={magneticMove}
              onPointerLeave={() => {
                x.set(0);
                y.set(0);
              }}
              style={{ x: sx, y: sy }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="shine relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-[9999px] bg-ink px-6 text-[15px] font-semibold text-paper transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(10,10,10,0.2)]"
            >
              <span className="relative">Get Started</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </Magnetic>
        </div>

        {/* Mobile actions */}
        <div className="relative z-10 flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-paper/60 text-ink transition-colors hover:bg-mist"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.08] p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-[16px] dark:border-white/[0.12] dark:bg-white/[0.08] dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)] dark:backdrop-blur-[18px] md:hidden"
            style={{ maxWidth: "var(--width-page)" }}
          >
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 + index * 0.05 }}
                className="flex items-center justify-between rounded-xl px-5 py-3.5 text-[16px] text-ink-soft transition-colors hover:bg-mist hover:text-ink"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-[15px] font-semibold text-paper"
            >
              Get Started <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
