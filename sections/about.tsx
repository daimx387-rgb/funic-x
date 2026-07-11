"use client";

import { ArrowUpRight, BarChart3, Code2, Rocket, Search } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/primitives";

const stats = [
  { to: 4000, suffix: "+", decimals: 0, label: "Teams building", sub: "across 60 countries" },
  { to: 1.2, suffix: "B", decimals: 1, label: "Inferences / month", sub: "and scaling" },
  { to: 99.99, suffix: "%", decimals: 2, label: "Platform uptime", sub: "SLA-backed" },
  { to: 42, suffix: "ms", decimals: 0, label: "Median latency", sub: "p50 global edge" },
] as const;

/* ============================ Count-up ============================ */
function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

/* ============================ Stat Card ============================ */
type Stat = (typeof stats)[number];

const cardEnter: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardStatic: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

function StatCard({ stat: s }: { stat: Stat }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={reduce ? cardStatic : cardEnter}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-paper p-5 transition-[border-color,box-shadow] duration-300 hover:border-ink/20 hover:shadow-[0_18px_40px_rgba(10,10,10,0.10)]"
    >
      {/* subtle top sheen on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-ink) 3%, transparent), transparent 70%)",
        }}
      />
      <div className="relative text-[clamp(1.85rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
        <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
      </div>
      <div className="relative mt-2.5 text-[14px] font-medium text-ink">{s.label}</div>
      <div className="relative mt-1 text-[12px] text-ink-mute">{s.sub}</div>
    </motion.div>
  );
}

/* ============================ Section ============================ */
export function About() {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-12% 0px" });

  return (
    <motion.section
      id="about"
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden border-y border-line bg-paper px-6 py-3 sm:px-12 sm:py-6 lg:px-24 lg:py-10"
    >
      <span className="about-aura" aria-hidden />

      <div className="relative mx-auto max-w-[1200px]">
        {/* ---------------- Top area ---------------- */}
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Left: heading + description */}
          <div>
            <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink-mute">
              01 — About
            </p>
            <h2 className="max-w-[20ch] text-[clamp(2.25rem,4vw+8px,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
              Building AI products that feel <span className="text-ink-soft">premium.</span>
            </h2>

            <div className="mt-4 max-w-md border-l border-ink/15 pl-6 sm:mt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                Founder story
              </p>
              <p className="mt-4 text-[16px] leading-7 text-ink-soft">
                I&rsquo;m Funic X — a young builder with a practical obsession: turning sharp ideas
                into useful, considered digital products. I care about the small decisions that make
                technology feel human.
              </p>
              <a
                href="#contact"
                className="group mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink"
              >
                Let&rsquo;s build together
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right: animated AI platform visual */}
          <div className="flex justify-center lg:justify-end lg:pl-2">
            <div className="about-3d" aria-hidden>
              <div className="about-orbit about-orbit-1" />
              <div className="about-orbit about-orbit-2" />

              <div className="about-callout about-callout-left">
                <span />
                Strategy<br />&amp; planning
              </div>
              <div className="about-callout about-callout-right">
                <span />
                Scalable<br />infrastructure
              </div>

              <div className="about-future-card">
                <span>Build</span>
                <span>the future</span>
                <span>with AI</span>
                <i />
              </div>

              <div className="about-platform" />
              <div className="about-platform about-platform-shadow" />

              <div className="about-core-box">
                <div className="about-core-top" />
                <div className="about-cube-grid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
                <div className="about-core-face about-core-front">
                  <strong>AI</strong>
                  <span>Intelligence<br />layer</span>
                </div>
                <div className="about-core-face about-core-side">
                  <span>Data</span>
                  <span>Models</span>
                  <span>Automation</span>
                </div>
              </div>

              <div className="about-node-lattice">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} />
                ))}
                <i className="about-lattice-line about-lattice-line-1" />
                <i className="about-lattice-line about-lattice-line-2" />
                <i className="about-lattice-line about-lattice-line-3" />
                <i className="about-lattice-line about-lattice-line-4" />
              </div>

              <div className="about-pulse-pad">
                <span />
                <i />
              </div>

              <div className="about-bars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>

              <div className="about-workflow">
                <div>
                  <Search size={20} />
                  <span>Research</span>
                </div>
                <div>
                  <Code2 size={20} />
                  <span>Develop</span>
                </div>
                <div>
                  <Rocket size={20} />
                  <span>Deploy</span>
                </div>
                <div>
                  <BarChart3 size={20} />
                  <span>Grow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Stats block — naturally follows ---------------- */}
        <div className="mt-6 sm:mt-8 lg:mt-9">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-mist px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              By the numbers
            </span>
          </div>

          <Reveal className="mx-auto mb-6 max-w-[680px] text-center sm:mb-8">
            <h2 className="text-[clamp(2rem,3.2vw+8px,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Trusted at scale, built for speed.
            </h2>
          </Reveal>

          <motion.div
            ref={gridRef}
            className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
            initial="hidden"
            animate={gridInView ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
            }}
          >
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
