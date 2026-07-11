"use client";

import { Counter, Reveal, SectionLabel, Stagger, staggerItem } from "@/components/ui/primitives";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { to: 4000, suffix: "+", label: "Teams building", sub: "across 60 countries" },
  { to: 1.2, suffix: "B", decimals: 1, label: "Inferences / month", sub: "and scaling" },
  { to: 99.99, suffix: "%", decimals: 2, label: "Platform uptime", sub: "SLA-backed" },
  { to: 42, suffix: "ms", label: "Median latency", sub: "p50 global edge" },
];

export function Stats() {
  return (
    <section className="section relative bg-mist">
      <div className="container-x">
        <SectionLabel>By the numbers</SectionLabel>
        <Reveal className="mx-auto mb-16 max-w-[680px] text-center">
          <h2 className="text-[clamp(2rem,3.2vw+8px,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            Trusted at scale, built for speed.
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-5 lg:grid-cols-4" stagger={0.1}>
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ Stat Card ============================ */
type Stat = (typeof stats)[number];

function StatCard({ stat: s }: { stat: Stat }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse-follow glow
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 300, damping: 35, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 300, damping: 35, mass: 0.3 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const onLeave = () => {
    mx.set(-9999);
    my.set(-9999);
    setHovered(false);
  };

  // Fluctuating value
  const decimals = s.decimals ?? 0;
  const base = s.to;
  const fluctuate = useFluctuate(base, hovered, reduce);

  const formatted = fluctuate.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-line bg-paper p-8 transition-[border-color,box-shadow] duration-500 hover:border-ink/20 hover:shadow-[0_24px_50px_rgba(10,10,10,0.08)]"
    >
      {/* Subtle background gradient on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(10,10,10,0.025), transparent 70%)",
        }}
      />

      {/* Mouse-follow radial glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[20px]"
        style={{
          background:
            "radial-gradient(220px circle at 0px 0px, rgba(10,10,10,0.06), transparent 60%)",
          left: sx,
          top: sy,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Number */}
      <div className="relative text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
        {formatted}
        {s.suffix}
      </div>

      {/* Label */}
      <div className="relative mt-5 text-[16px] font-medium text-ink">{s.label}</div>
      <div className="relative mt-1 text-[14px] text-ink-mute">{s.sub}</div>
    </motion.div>
  );
}

/* ============================ Fluctuate hook ============================ */
function useFluctuate(base: number, active: boolean, reduce: boolean | null) {
  const [val, setVal] = useState(base);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const fromRef = useRef(base);
  const phaseRef = useRef(0);

  useEffect(() => {
    if (reduce) {
      setVal(base);
      return;
    }
    if (!active) {
      // Smoothly return to base
      cancelAnimationFrame(rafRef.current);
      fromRef.current = val;
      startRef.current = performance.now();
      const settle = (now: number) => {
        const p = Math.min((now - startRef.current) / 800, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(fromRef.current + (base - fromRef.current) * eased);
        if (p < 1) rafRef.current = requestAnimationFrame(settle);
        else setVal(base);
      };
      rafRef.current = requestAnimationFrame(settle);
      return () => cancelAnimationFrame(rafRef.current);
    }

    // Generate natural fluctuation waypoints around base
    const amplitude = base * 0.04 + 0.5; // ~4% range, min 0.5
    const waypoints: number[] = [];
    const steps = 4;
    for (let i = 0; i < steps; i++) {
      const t = (i + 1) / (steps + 1);
      // smooth pseudo-random using sine offsets
      const offset =
        Math.sin(phaseRef.current + i * 1.7) * amplitude +
        Math.cos(phaseRef.current * 0.6 + i * 2.3) * amplitude * 0.5;
      waypoints.push(base + offset * (1 - t * 0.3));
    }
    waypoints.push(base);
    phaseRef.current += 1;

    // Animate through waypoints
    const totalDur = 1800; // 1.8s
    const startTime = performance.now();
    fromRef.current = val;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / totalDur, 1);

      // Map p to waypoint segments
      const segCount = waypoints.length - 1;
      const segP = p * segCount;
      const seg = Math.min(Math.floor(segP), segCount - 1);
      const localP = segP - seg;

      // Ease within segment
      const eased = 1 - Math.pow(1 - localP, 2);

      const from = seg === 0 ? fromRef.current : waypoints[seg - 1];
      const to = waypoints[seg];
      setVal(from + (to - from) * eased);

      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else {
        setVal(base);
        // Continue with new fluctuation cycle while still hovered
        if (ref.current) rafRef.current = requestAnimationFrame(tick2);
      }
    };

    // Second cycle generator (keeps fluctuating while hovered)
    const ref = { current: true };
    const tick2 = (now: number) => {
      if (!ref.current) return;
      // new waypoints
      const wp: number[] = [];
      for (let i = 0; i < steps; i++) {
        const offset =
          Math.sin(phaseRef.current + i * 1.7) * amplitude +
          Math.cos(phaseRef.current * 0.6 + i * 2.3) * amplitude * 0.5;
        wp.push(base + offset * 0.8);
      }
      wp.push(base);
      phaseRef.current += 1;

      const start = now;
      const cycle = (cnow: number) => {
        const cp = Math.min((cnow - start) / totalDur, 1);
        const segP = cp * (wp.length - 1);
        const seg = Math.min(Math.floor(segP), wp.length - 2);
        const lp = segP - seg;
        const eased = 1 - Math.pow(1 - lp, 2);
        const from = seg === 0 ? base : wp[seg - 1];
        setVal(from + (wp[seg] - from) * eased);
        if (cp < 1 && ref.current) rafRef.current = requestAnimationFrame(cycle);
        else if (ref.current) rafRef.current = requestAnimationFrame(tick2);
      };
      rafRef.current = requestAnimationFrame(cycle);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      ref.current = false;
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, base, reduce]);

  return val;
}
