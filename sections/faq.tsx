"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionLabel } from "@/components/ui/primitives";

const faqs = [
  {
    q: "What makes Funic X different from other AI platforms?",
    a: "Funic X unifies orchestration, observability, and deployment into one cohesive surface. Most teams stitch together 5–10 tools — we replace all of them with a single, opinionated platform designed by people who ship AI every day.",
  },
  {
    q: "Do I need ML expertise to get started?",
    a: "No. The visual pipeline canvas lets product designers and engineers collaborate without writing glue code. Advanced users can drop into code mode for full control at any node.",
  },
  {
    q: "Which models are supported?",
    a: "All major providers — OpenAI, Anthropic, Google, Mistral, and open-weight models you host yourself. Model routing automatically picks the best fit per request based on your cost and latency goals.",
  },
  {
    q: "How does pricing scale?",
    a: "The Starter plan is free forever. Pro scales per seat with included inference volume, and overages are billed transparently at flat token rates. Enterprise pricing is custom and volume-based.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We are SOC 2 Type II certified, support SSO/SAML, granular RBAC, full audit logs, and offer VPC and on-prem deployment for Enterprise. Your data is never used to train shared models.",
  },
  {
    q: "Can I migrate from my current stack?",
    a: "Absolutely. Our team provides white-glove migration support on Pro and Enterprise, including importers for common workflow formats and dedicated onboarding sessions.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section relative">
      <div className="mx-auto max-w-[820px]">
        <SectionLabel>FAQ</SectionLabel>
        <Reveal className="mb-16 text-center">
          <h2 className="text-[clamp(2rem,3.2vw+8px,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            Questions, answered.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-[18px] border transition-colors duration-300 ${
                    isOpen ? "border-ink/20 bg-paper" : "border-line bg-paper/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] font-medium text-ink">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? "bg-ink text-paper" : "bg-mist text-ink"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 text-[15px] leading-[1.7] text-ink-soft">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
