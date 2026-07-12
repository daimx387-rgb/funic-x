"use client";

import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Reveal, Stagger, staggerItem } from "@/components/ui/primitives";

const PURPLE = "#6d4aff";

const services = [
  {
    num: "01",
    title: "AI MVP Development",
    desc: "Launch production-ready AI startups faster.",
  },
  {
    num: "02",
    title: "Custom AI Agents",
    desc: "Intelligent agents that automate workflows and business operations.",
  },
  {
    num: "03",
    title: "Modern Web Applications",
    desc: "Beautiful, fast, scalable React applications.",
  },
  {
    num: "04",
    title: "AI Automation",
    desc: "Connect tools, APIs and AI to eliminate repetitive work.",
  },
];

export function Services() {
  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="container-x">
        {/* Header */}
        <Reveal className="max-w-[780px]">
          <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-ink-mute dark:text-white/50">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: PURPLE }} />
            What we build
          </span>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="mt-3 text-[clamp(1.4rem,2.4vw+4px,2.1rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink dark:text-white"
          >
            {[
              "AI",
              "solutions",
              "that",
              "help",
              "businesses",
              "launch",
              "faster",
              "and",
              "grow",
              "smarter.",
            ].map((w, i) => (
              <span key={i} className="inline-block">
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                    transition={{
                      duration: 0.6,
                      delay: 0.045 * i,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                </span>
                {i < 9 ? " " : ""}
              </span>
            ))}
          </motion.h2>
          <p className="mt-3 max-w-[520px] text-[13.5px] leading-[1.5] text-ink-soft dark:text-[#d1d5db]">
            From first prototype to production scale, we design and ship AI
            products that move your business forward.
          </p>
        </Reveal>

        {/* Rows */}
        <Stagger className="mt-10 border-b border-line dark:border-white/10" stagger={0.09}>
          {services.map((s) => (
            <ServiceRow key={s.num} service={s} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ Service Row ============================ */
type Service = (typeof services)[number];

function ServiceRow({ service: s }: { service: Service }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-follow purple glow
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const op = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 28, mass: 0.4 });
  const sop = useSpring(op, { stiffness: 200, damping: 30 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    mx.set(px);
    my.set(py);
    op.set(1);
    ref.current.style.setProperty("--gx", `${(px / r.width) * 100}%`);
    ref.current.style.setProperty("--gy", `${(py / r.height) * 100}%`);
  };
  const onLeave = () => op.set(0);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex cursor-pointer items-center gap-4 border-t border-line px-2 py-5 transition-colors duration-500 hover:bg-mist/50 dark:border-white/10 dark:hover:bg-white/[0.02] sm:gap-6 sm:px-4 sm:py-5"
    >
      {/* Mouse-follow radial purple glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), rgba(109,74,255,0.12), transparent 60%)",
          opacity: sop,
        }}
      />

      {/* Purple border glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(109,74,255,0.45), 0 22px 55px -28px rgba(109,74,255,0.55)",
        }}
      />

      {/* Number */}
      <span className="relative w-[38px] shrink-0 font-mono text-[12px] font-medium tracking-[0.1em] text-ink-mute transition-all duration-500 group-hover:text-[#6d4aff] group-hover:[text-shadow:0_0_22px_rgba(109,74,255,0.55)] sm:w-[52px] sm:text-[14px] dark:text-zinc-400">
        {s.num}
      </span>

      {/* Title + description */}
      <div className="relative min-w-0 flex-1">
        <h3 className="relative text-[clamp(1.05rem,1.6vw+3px,1.5rem)] font-semibold tracking-[-0.03em] text-ink dark:text-white">
          <span className="relative z-10">{s.title}</span>
          <span
            aria-hidden
            className="absolute bottom-[14%] left-0 z-0 h-[0.5em] w-full origin-left scale-x-0 rounded-[3px] bg-[#6d4aff]/15 transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
        </h3>
        <p className="mt-0.5 max-w-[540px] text-[13.5px] leading-[1.45] text-ink-soft dark:text-zinc-300">
          {s.desc}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight
        strokeWidth={1.5}
        className="relative h-5 w-5 shrink-0 text-ink-soft transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#6d4aff] dark:text-zinc-300 dark:group-hover:text-white"
      />
    </motion.div>
  );
}
