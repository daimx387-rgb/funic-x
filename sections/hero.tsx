"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useRef, useState } from "react";
import VariableProximity from "@/components/VariableProximity";
import CardSwap, { Card } from "@/components/CardSwap";
import {
  ChatAssistantShot,
  WorkflowAutomationShot,
  AnalyticsDashboardShot,
  MultiAgentSystemShot,
} from "@/components/CardSwapMockups";

const ease = [0.16, 1, 0.3, 1] as const;

const trusts = [
  "OpenAI", "Vercel", "Linear", "Anthropic",
  "GitHub",
];

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [email, setEmail] = useState("");

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(x * 16);
    tiltX.set(-y * 16);
  };
  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      className="hero-v2 section--flush relative overflow-hidden"
    >
      {/* Ambient grain */}
      <div className="grain" style={{ opacity: 0.04 }} />

      <div
        className="mx-auto w-full"
        style={{ maxWidth: "var(--width-page)" }}
      >
        <div className="flex min-h-[100dvh] flex-col gap-12 pb-24 pt-32 lg:flex-row lg:items-start lg:gap-8 lg:pt-28 lg:pb-32">
          {/* ===================== LEFT ===================== */}
          <div className="flex w-full flex-col justify-center lg:sticky lg:top-24 lg:w-[44%] lg:self-start lg:pr-6">
            {/* Announcement badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="group mb-7 inline-flex w-fit items-center gap-2.5 rounded-[9999px] border border-line bg-mist px-3.5 py-2 backdrop-blur-md"
            >
              <span className="dot-live grid h-5 w-5 place-items-center rounded-full bg-ink">
                <Sparkles className="h-2.5 w-2.5 text-paper" />
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                Introducing Funic X 2.0
              </span>
              <span className="inline-flex h-4 items-center rounded-full bg-ink/10 px-1.5 font-mono text-[9px] tracking-[0.1em] text-ink-mute">
                NEW
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease, delay: 0.08 }}
              className="glow-text text-[clamp(2.6rem,5.4vw+8px,4.85rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-ink"
            >
              <div ref={containerRef} style={{ position: 'relative' }}>
                <VariableProximity
                  label="Build AI Products That Scale"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  radius={140}
                  falloff="linear"
                  containerRef={containerRef}
                />
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.22 }}
              className="mt-6 max-w-[480px] text-[clamp(1.05rem,0.4vw+0.9rem,1.2rem)] leading-[1.6] text-ink-soft"
            >
              Funic X unifies design, engineering, and deployment into one
              AI-native workspace — go from idea to production in days, not
              quarters.
            </motion.p>

            {/* Email capture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.35 }}
              className="mt-8 w-full max-w-[480px]"
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="group relative flex items-center gap-2 rounded-[9999px] border border-line bg-mist/60 p-1.5 pl-5 backdrop-blur-md transition-all duration-300 focus-within:border-ink/30 focus-within:bg-ink/[0.06]"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-mute"
                />
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="cta-glow relative inline-flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-[9999px] bg-ink px-7 text-[15px] font-semibold text-paper"
                >
                  <span className="relative">Get Started</span>
                  <ArrowRight className="relative h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </form>
              <p className="mt-3 pl-5 font-mono text-[11.5px] tracking-[0.04em] text-ink-mute">
                Start free — no credit card required.
              </p>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
              }}
              className="mt-12 flex flex-col items-start gap-4"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-ink text-ink" />
                ))}
                <span className="ml-2 font-mono text-[11.5px] tracking-[0.04em] text-ink-mute">
                  Trusted by 4,000+ teams worldwide
                </span>
              </motion.div>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {trusts.map((t) => (
                  <motion.div
                    key={t}
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 0.62, y: 0 } }}
                    whileHover={{ opacity: 1, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1"
                  >
                    <motion.span whileHover={{ rotate: 6, scale: 1.1 }} transition={{ type: "spring", stiffness: 340, damping: 14 }}>
                      <BrandIcon name={t} />
                    </motion.span>
                    <span className="text-[13.5px] font-medium tracking-[-0.01em] text-ink">{t}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ===================== RIGHT ===================== */}
          <div className="relative flex w-full items-center justify-center lg:w-[56%] lg:min-h-[80vh] lg:pl-4 lg:pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="hero-card-swap"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformPerspective: 1100 }}
            >
              <CardSwap
                width={580}
                height={480}
                cardDistance={60}
                verticalDistance={70}
                delay={3000}
                skewAmount={6}
                easing="elastic"
              >
                <Card>
                  <div className="card-product">
                    <div className="card-shot">
                      <ChatAssistantShot />
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">AI Chat Assistant</h3>
                    <p className="card-desc">Natural language conversations powered by intelligent AI.</p>
                  </div>
                </Card>
                <Card>
                  <div className="card-product">
                    <div className="card-shot">
                      <WorkflowAutomationShot />
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Workflow Automation</h3>
                    <p className="card-desc">Automate repetitive business tasks with AI agents.</p>
                  </div>
                </Card>
                <Card>
                  <div className="card-product">
                    <div className="card-shot">
                      <AnalyticsDashboardShot />
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Analytics Dashboard</h3>
                    <p className="card-desc">Real-time insights and intelligent reporting.</p>
                  </div>
                </Card>
                <Card>
                  <div className="card-product">
                    <div className="card-shot">
                      <MultiAgentSystemShot />
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Multi-Agent System</h3>
                    <p className="card-desc">Multiple AI agents working together seamlessly.</p>
                  </div>
                </Card>
              </CardSwap>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ Brand SVG Icons ============================ */
function BrandIcon({ name }: { name: string }) {
  const s = "h-[18px] w-[18px] text-ink-soft";
  switch (name) {
    case "OpenAI":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.2 2.4 6.7v11l9.6 5.5 9.6-5.5V6.7L12 1.2zm0 3.8L19.2 9v6.4L12 19l-7.2-3.8V9L12 5z" />
          <path d="M8.5 9.1v6.2M15.5 9.1v6.2M12 7.4v9.6" opacity=".55" />
        </svg>
      );
    case "Vercel":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 22 20H2L12 2z" />
        </svg>
      );
    case "Linear":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5 21 6.5v11L12 23 3 17.5v-11L12 1.5z" opacity=".85" />
          <path d="m7 11 5-3 5 3-5 3-5-3z" fill="#050505" />
        </svg>
      );
    case "Anthropic":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M18 19 12 7 6 19" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="7" r="2" />
        </svg>
      );
    case "GitHub":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .3C5.4.3 0 5.7 0 12.3c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.4.5-2.5 1.3-3.3-.2-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.3A11.4 11.4 0 0 1 12 6.1a11.4 11.4 0 0 1 3 .4c2.3-1.6 3.3-1.3 3.3-1.3.7 1.6.3 2.9.1 3.2.8.8 1.3 1.9 1.3 3.3 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.7 18.6.3 12 .3z" />
        </svg>
      );
    default:
      return null;
  }
}
