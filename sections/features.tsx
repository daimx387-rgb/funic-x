"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  Cpu,
  Gauge,
  GitBranch,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Reveal,
  SectionLabel,
  Stagger,
  staggerItem,
} from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  span: string;
  visual: ReactNode;
  accent: string;
};

const features: Feature[] = [
  {
    icon: Workflow,
    title: "Visual pipelines",
    desc: "Compose multi-step AI workflows on an infinite canvas. Branch, version, and replay every run.",
    span: "lg:col-span-2",
    accent: "#0a0a0a",
    visual: <PipelineVisual />,
  },
  {
    icon: Cpu,
    title: "Model routing",
    desc: "Auto-route requests to the best model for cost, latency, or quality.",
    span: "lg:col-span-1",
    accent: "#4f46e5",
    visual: <RoutingVisual />,
  },
  {
    icon: Gauge,
    title: "Real-time observability",
    desc: "Trace every token, latency spike, and error with sub-second streaming.",
    span: "lg:col-span-1",
    accent: "#0ea5e9",
    visual: <ObservabilityVisual />,
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    desc: "SOC 2 Type II, SSO, granular RBAC, and audit logs out of the box.",
    span: "lg:col-span-1",
    accent: "#16a34a",
    visual: <SecurityVisual />,
  },
  {
    icon: GitBranch,
    title: "Versioned datasets",
    desc: "Git-like diffs for every dataset change.",
    span: "lg:col-span-1",
    accent: "#d97706",
    visual: <DatasetVisual />,
  },
];

export function Features() {
  return (
    <section id="features" className="section relative overflow-hidden">
      {/* Ambient radial backdrops */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,10,10,0.035), transparent 70%)",
          }}
        />
      </div>

      <div className="container-x">
        <SectionLabel>Features</SectionLabel>



        <Stagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ Feature Card ============================ */
function FeatureCard({ feature: f }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Mouse-follow radial glow (GPU transforms only)
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
  const onLeave = () => {
    op.set(0);
  };

  const Icon = f.icon;

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-paper p-5",
        "shadow-[0_1px_3px_rgba(10,10,10,0.05)] transition-[border-color,box-shadow] duration-[400ms]",
        "hover:border-ink/20 hover:shadow-[0_20px_48px_rgba(10,10,10,0.09)]",
        "will-change-transform",
        f.span
      )}
      style={{ minHeight: 0 }}
    >
      {/* Animated border glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), ${f.accent}14, transparent 60%)`,
        }}
      />

      {/* Mouse-follow radial glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[20px]"
        style={{
          background: `radial-gradient(260px circle at 0px 0px, ${f.accent}1f, transparent 55%)`,
          left: sx,
          top: sy,
          x: "-50%",
          y: "-50%",
          opacity: sop,
        }}
      />

      {/* Header: icon + title */}
      <div className="relative flex items-center gap-3">
        <motion.div
          whileHover={reduce ? undefined : { rotate: 8, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 320, damping: 14 }}
          className="relative grid h-9 w-9 place-items-center rounded-lg border border-line bg-mist text-ink transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
        >
          <Icon className="h-[16px] w-[16px]" strokeWidth={2} />
          <span
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40"
            style={{ background: f.accent }}
          />
        </motion.div>
        <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-ink">
          {f.title}
        </h3>
      </div>

      {/* Description */}
      <p className="relative mt-2.5 max-w-[440px] text-[13px] leading-[1.55] text-ink-soft">
        {f.desc}
      </p>

      {/* Visual */}
      <div className="relative mt-4 flex-1">{f.visual}</div>
    </motion.div>
  );
}

/* ============================ 1. Pipeline Visual ============================ */
function PipelineVisual() {
  const reduce = useReducedMotion();
  const nodes = ["Input", "Embed", "Retrieve", "Generate", "Output"];
  const ACTIVE = 3;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Continuous left-to-right step cycling
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % nodes.length), 650);
    return () => clearInterval(id);
  }, [reduce, inView, nodes.length]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[92px] flex-col justify-center"
    >
      {/* Horizontal pipeline — centered with breathing room */}
      <div className="flex items-center justify-center px-2">
        {nodes.map((n, i) => (
          <div
            key={n}
            className={i < nodes.length - 1 ? "flex flex-1 items-center" : "flex items-center"}
          >
            {/* Node */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  delay: 0.15 + i * 0.09,
                  type: "spring",
                  stiffness: 240,
                  damping: 16,
                }}
                className={cn(
                  "relative grid h-9 w-9 place-items-center rounded-lg text-[11px] font-semibold",
                  i === ACTIVE
                    ? "bg-ink text-paper"
                    : i === step
                      ? "border border-ink/30 bg-mist text-ink"
                      : "border border-line bg-paper text-ink-soft"
                )}
              >
                {/* Active node soft glow */}
                {i === ACTIVE && !reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-lg"
                    style={{ boxShadow: "0 0 14px rgba(10,10,10,0.35)" }}
                    animate={{ opacity: [0.6, 0.2, 0.6], scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {/* Cycling step ring */}
                {i === step && i !== ACTIVE && !reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-[-3px] rounded-lg border border-ink/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 1.2] }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                  />
                )}
                <span className="relative">{n[0]}</span>
              </motion.div>
              <span className="font-mono text-[9px] tracking-[0.04em] text-ink-mute">
                {n}
              </span>
            </div>

            {/* Connector line */}
            {i < nodes.length - 1 && (
              <div className="relative mx-1.5 h-px flex-1">
                {/* base track */}
                <div className="absolute inset-0 h-px bg-line" />
                {/* animated fill — draws on initial view */}
                <motion.div
                  className="absolute inset-y-0 left-0 h-px bg-ink"
                  style={{ opacity: 0.5 }}
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{
                    delay: 0.22 + i * 0.09,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
                {/* travelling data packet */}
                {!reduce && (
                  <motion.span
                    className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-ink"
                    initial={{ left: "0%", opacity: 0 }}
                    animate={
                      inView ? { left: ["0%", "100%"], opacity: [0, 1, 0] } : {}
                    }
                    transition={{
                      delay: 0.45 + i * 0.09,
                      duration: 0.9,
                      repeat: Infinity,
                      repeatDelay: 1.6,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
        <span className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-green-500"
            animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          pipeline running
        </span>
        <span>5 steps · auto</span>
      </div>
    </div>
  );
}

/* ============================ 2. Model Routing Visual ============================ */
function RoutingVisual() {
  const reduce = useReducedMotion();
  const models = ["GPT-4o", "Claude", "Llama 3", "Mistral"];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative min-h-[120px] overflow-hidden rounded-xl border border-line-soft bg-mist/50 p-3.5"
    >
      <div className="relative flex h-full items-center justify-between gap-3">
        {/* request node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-[10px] font-semibold text-paper"
        >
          REQ
        </motion.div>

        {/* connecting lines */}
        <svg
          className="absolute left-9 top-1/2 h-px w-[calc(100%-72px)] -translate-y-1/2"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          {[20, 40, 60, 80].map((x, i) => (
            <motion.line
              key={x}
              x1="0"
              y1="0.5"
              x2={x}
              y2="0.5"
              stroke="#0a0a0a"
              strokeWidth="0.5"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={inView ? { strokeDashoffset: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              opacity={0.18}
            />
          ))}
        </svg>

        {/* model chips */}
        <div className="flex flex-1 flex-wrap justify-end gap-1.5">
          {models.map((m, i) => (
            <motion.span
              key={m}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.3 + i * 0.08,
                type: "spring",
                stiffness: 220,
                damping: 14,
              }}
              className="rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-ink-soft"
            >
              <motion.span
                animate={
                  reduce ? undefined : { y: [0, -3, 0] }
                }
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                {m}
              </motion.span>
            </motion.span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-ink-mute">
        <span>routing → best fit</span>
        <span className="text-green-600">99.9% SLA</span>
      </div>
    </div>
  );
}

/* ============================ 3. Observability Visual ============================ */
function ObservabilityVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative min-h-[120px] overflow-hidden rounded-xl border border-line-soft bg-mist/50 p-3.5"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
          p95 latency
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink">
          <motion.span
            animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-sky-500"
          />
          142ms
        </div>
      </div>

      <svg
        className="mt-2 h-[64px] w-full"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="obs-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,60 C20,55 30,30 45,40 C60,50 70,20 90,28 C110,36 120,12 140,22 C160,32 175,18 200,26 L200,80 L0,80 Z"
          fill="url(#obs-fill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
        <motion.path
          d="M0,60 C20,55 30,30 45,40 C60,50 70,20 90,28 C110,36 120,12 140,22 C160,32 175,18 200,26"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="400"
          initial={{ strokeDashoffset: 400 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ delay: 0.3, duration: 1.4, ease: "easeInOut" }}
        />
      </svg>

      <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-ink-mute">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> ok
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> warn
        </span>
        <span className="ml-auto">tokens 24.1k/s</span>
      </div>
    </div>
  );
}

/* ============================ 4. Security Visual ============================ */
function SecurityVisual() {
  const reduce = useReducedMotion();
  const badges = ["SOC 2", "ISO 27001", "GDPR", "HIPAA", "SSO", "RBAC"];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative min-h-[120px] overflow-hidden rounded-xl border border-line-soft bg-mist/50 p-3.5"
    >
      {/* scanning line */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-green-500/40"
          animate={{ y: [0, 140, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className="flex items-center gap-2">
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="grid h-7 w-7 place-items-center rounded-md bg-green-600/10 text-green-700"
        >
          <ShieldCheck className="h-4 w-4" />
        </motion.span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
          compliant
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {badges.map((b, i) => (
          <motion.span
            key={b}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.06, type: "spring", stiffness: 240, damping: 16 }}
            className="rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] tracking-[0.04em] text-ink-soft"
          >
            {b}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ============================ 5. Versioned Datasets Visual ============================ */
function DatasetVisual() {
  const reduce = useReducedMotion();
  const commits = [
    { m: "feat: add split v3", t: "2h" },
    { m: "fix: dedupe rows", t: "1d" },
    { m: "init dataset", t: "5d" },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      className="relative min-h-[120px] overflow-hidden rounded-xl border border-line-soft bg-mist/50 p-3.5"
    >
      <div className="relative pl-4">
        {/* vertical branch line */}
        <svg
          className="absolute left-1 top-1 h-[calc(100%-8px)] w-px"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100%"
            stroke="#d97706"
            strokeWidth="1"
            strokeDasharray="200"
            initial={{ strokeDashoffset: 200 }}
            animate={inView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
            opacity={0.5}
          />
        </svg>

        <div className="flex flex-col gap-2.5">
          {commits.map((c, i) => (
            <div key={c.m} className="relative flex items-center gap-2">
              <motion.span
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 240, damping: 14 }}
                className="absolute -left-3 h-2 w-2 rounded-full border-2 border-white bg-amber-600"
              />
              <span className="font-mono text-[11px] text-ink">{c.m}</span>
              <span className="ml-auto font-mono text-[10px] text-ink-mute">
                {c.t}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-ink-mute">
        <GitBranch className="h-3 w-3" />
        main · 3 commits ahead
      </div>
    </div>
  );
}


/* ============================ Reduced-motion fallback variants ============================ */
const _reduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};
void _reduced;
