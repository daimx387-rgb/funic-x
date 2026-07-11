"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  Magnetic,
  Reveal,
  SectionLabel,
  Stagger,
  staggerItem,
} from "@/components/ui/primitives";
import BorderGlow from "@/components/BorderGlow";

type Plan = {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
  /** wrap card in <BorderGlow> for the edge-following glow effect */
  glow?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "For individuals exploring AI product development.",
    features: [
      "1 project",
      "10k inferences / mo",
      "Community support",
      "Basic observability",
      "Shared models",
    ],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$29",
    period: "per seat / mo",
    desc: "For teams shipping AI products to production.",
    features: [
      "Unlimited projects",
      "5M inferences / mo",
      "Priority support",
      "Full observability & tracing",
      "Custom model routing",
      "One-click edge deploy",
      "Versioned datasets",
    ],
    cta: "Start free trial",
    popular: true,
    glow: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "talk to us",
    desc: "For organizations with advanced scale & compliance.",
    features: [
      "Unlimited inferences",
      "Dedicated support + SLA",
      "SOC 2 / SSO / SAML",
      "On-prem & VPC deploy",
      "Custom integrations",
      "Audit logs & RBAC",
    ],
    cta: "Contact sales",
    glow: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section relative bg-mist">
      <div className="container-x">
        <SectionLabel>Pricing</SectionLabel>


        <Stagger className="grid grid-cols-1 gap-6 lg:grid-cols-3" stagger={0.1}>
          {plans.map((p) => {
            const popularBadge = p.popular ? (
              <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-[9999px] bg-ink px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-paper shadow-[0_6px_18px_rgba(10,10,10,0.18)]">
                Most popular
              </span>
            ) : null;

            const inner = (
              <>
                {popularBadge}
                <div className="flex h-full flex-col p-8">
                  <div className="text-[17px] font-semibold text-ink">{p.name}</div>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-ink">
                      {p.price}
                    </span>
                    <span className="text-[15px] text-ink-mute">{p.period}</span>
                  </div>
                  <p className="mt-5 text-[15px] leading-[1.55] text-ink-soft">{p.desc}</p>

                  <div className="my-7 h-px w-full bg-line" />

                  <ul className="flex flex-1 flex-col gap-3.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px] text-ink">
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            p.popular ? "bg-ink text-paper" : "bg-mist text-ink"
                          }`}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Magnetic strength={0.18} className="mt-8">
                    <motion.a
                      href="#"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`shine group relative inline-flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-[9999px] px-7 text-[15px] font-semibold transition-shadow duration-300 ${
                        p.popular
                          ? "bg-ink text-paper hover:shadow-[0_10px_30px_rgba(10,10,10,0.2)]"
                          : "border border-line bg-paper text-ink hover:border-ink"
                      }`}
                    >
                      <span className="relative">{p.cta}</span>
                      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.a>
                  </Magnetic>
                </div>
              </>
            );

            if (p.glow) {
              return (
                <motion.div
                  key={p.name}
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <BorderGlow
                    backgroundColor="var(--color-paper)"
                    borderRadius={20}
                    glowColor="255 78 64"
                    glowRadius={32}
                    glowIntensity={1.0}
                    edgeSensitivity={32}
                    coneSpread={22}
                    fillOpacity={0.45}
                    colors={["#6d4aff", "#8b5cf6", "#a78bfa"]}
                    className="h-full border-line"
                  >
                    {inner}
                  </BorderGlow>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={p.name}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex h-full flex-col overflow-hidden rounded-[20px] border transition-shadow duration-500 ${
                  p.popular
                    ? "border-ink bg-paper shadow-[0_24px_60px_rgba(10,10,10,0.12)]"
                    : "border-line bg-paper hover:shadow-[0_20px_40px_rgba(10,10,10,0.06)]"
                }`}
              >
                {inner}
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
