"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import {
  Activity,
  Clock,
  Shield,
  Cpu,
} from "lucide-react";

const metrics = [
  {
    label: "Total Requests",
    value: 847231,
    suffix: "",
    prefix: "",
    delta: "+12.4%",
    deltaPositive: true,
    icon: Activity,
    format: (v: number) => `${(v / 1000).toFixed(1)}K`,
  },
  {
    label: "Avg Latency",
    value: 34,
    suffix: "ms",
    prefix: "",
    delta: "-8.2%",
    deltaPositive: true,
    icon: Clock,
    format: (v: number) => `${v}`,
  },
  {
    label: "Uptime",
    value: 99.99,
    suffix: "%",
    prefix: "",
    delta: "Stable",
    deltaPositive: true,
    icon: Shield,
    format: (v: number) => v.toFixed(2),
  },
  {
    label: "Active Models",
    value: 14,
    suffix: "",
    prefix: "",
    delta: "+3 this week",
    deltaPositive: true,
    icon: Cpu,
    format: (v: number) => `${v}`,
  },
];

function AnimatedValue({
  target,
  format,
}: {
  target: number;
  format: (v: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    const obj = { v: 0 };
    trigger.to(obj, {
      v: target,
      duration: 2,
      ease: "expo.out",
      onUpdate: () => setVal(obj.v),
    });

    return () => {
      trigger.kill();
    };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(val)}
    </span>
  );
}

export function Metrics() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          whileHover={{ y: -4 }}
          className="group relative cursor-pointer overflow-hidden rounded-[22px] border border-[#1a1a1a] bg-[#0a0a0a] p-7 transition-all duration-500 hover:border-[#333] hover:shadow-[0_0_30px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle inner glow on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(300px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.015),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex items-start justify-between">
            <div>
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#666]">
                {m.label}
              </div>
              <div className="text-[30px] font-semibold tracking-[-0.03em] text-white">
                <AnimatedValue target={m.value} format={m.format} />
                {m.suffix && (
                  <span className="ml-0.5 text-[16px] text-[#999]">{m.suffix}</span>
                )}
              </div>
              <div
                className={`mt-2 text-[12px] font-medium ${
                  m.deltaPositive ? "text-[#888]" : "text-[#555]"
                }`}
              >
                {m.delta}
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#111] ring-1 ring-[#1a1a1a]">
              <m.icon size={16} className="text-[#999]" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
