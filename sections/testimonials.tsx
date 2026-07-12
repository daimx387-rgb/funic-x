"use client";

import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "@/components/ui/primitives";

type Quote = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const quotes: Quote[] = [
  {
    quote:
      "Funic X collapsed our entire ML infra into one tool. We shipped our agent in 9 days instead of a quarter.",
    name: "Maya Chen",
    role: "Head of AI",
    company: "Northwind",
  },
  {
    quote:
      "The observability alone is worth it. We caught a regression before it hit production for the first time ever.",
    name: "Daniel Okafor",
    role: "Staff Engineer",
    company: "Lumen Labs",
  },
  {
    quote:
      "It feels like the product was designed by people who actually ship AI. Every detail is considered.",
    name: "Sofia Rivera",
    role: "CTO",
    company: "Cortex",
  },
  {
    quote:
      "We replaced five tools with Funic X and cut our pipeline cost by 38%. The team onboarded in an afternoon.",
    name: "Arjun Mehta",
    role: "VP Engineering",
    company: "Vela",
  },
  {
    quote:
      "Deployment that just works. Zero-config rollbacks saved us twice last month. Genuinely premium.",
    name: "Elena Novak",
    role: "Founder",
    company: "Stratus",
  },
  {
    quote:
      "The visual pipelines let our designers contribute to AI workflows. That collaboration is priceless.",
    name: "Kai Tanaka",
    role: "Design Lead",
    company: "Fold",
  },
];

function Card({ q }: { q: Quote }) {
  return (
    <figure className="mx-3 flex w-[320px] shrink-0 flex-col rounded-[18px] border border-line bg-paper/80 p-6 backdrop-blur-sm transition-all duration-400 hover:border-ink/15 hover:shadow-[0_20px_40px_rgba(10,10,10,0.06)] sm:mx-4 sm:w-[420px] sm:p-8">
      <blockquote className="text-[clamp(0.95rem,0.5vw+0.78rem,1.125rem)] leading-[1.6] text-ink">
        “{q.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-ink text-[15px] font-semibold text-paper">
          {q.name[0]}
        </div>
        <div>
          <div className="text-[15px] font-semibold text-ink">{q.name}</div>
          <div className="text-[13px] text-ink-mute">
            {q.role} · {q.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const row = [...quotes, ...quotes];
  return (
    <section className="section relative overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: "var(--width-page)" }}>
        <SectionLabel>Loved by builders</SectionLabel>
        <Reveal className="mx-auto mb-16 max-w-[680px] text-center">
          <h2 className="text-[clamp(2rem,3.2vw+8px,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            What teams say after switching to Funic X
          </h2>
        </Reveal>
      </div>

      {/* Marquee rows */}
      <div className="marquee-wrap relative">
        <div className="marquee-track">
          {row.map((q, i) => (
            <Card key={i} q={q} />
          ))}
        </div>
      </div>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-paper to-transparent" />
    </section>
  );
}
