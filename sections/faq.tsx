"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Reveal, SectionLabel, Stagger, staggerItem } from "@/components/ui/primitives";

const faqs = [
  {
    q: "What is Funic X?",
    a: "Funic X is the AI-native platform that unifies design, engineering, and deployment into one workspace — so your team can go from idea to production AI in days, not quarters.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. The visual pipeline canvas lets designers and engineers collaborate without writing glue code, while advanced users can drop into full code mode at any node.",
  },
  {
    q: "Which models and providers are supported?",
    a: "All major providers — OpenAI, Anthropic, Google, Mistral, and the open-weight models you host yourself — with automatic routing based on your cost and latency goals.",
  },
  {
    q: "How does pricing work?",
    a: "The Starter plan is free forever. Pro scales per seat with included inference volume, and Enterprise pricing is custom and volume-based. No hidden fees.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We are SOC 2 Type II certified with SSO/SAML, granular RBAC, full audit logs, and VPC or on-prem deployment for Enterprise. Your data is never used to train shared models.",
  },
  {
    q: "Can I migrate from my current stack?",
    a: "Absolutely. Our team provides white-glove migration on Pro and Enterprise, including importers for common workflow formats and dedicated onboarding sessions.",
  },
];

function AccordionCard({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const verticalRef = useRef<HTMLSpanElement>(null);
  const isFirstMount = useRef(true);

  /* ── Framer tilt ── */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(py, [-1, 1], [2, -2]), spring);
  const rotateY = useSpring(useTransform(px, [-1, 1], [-2, 2]), spring);
  const floatY = useSpring(useTransform(py, [-1, 1], [5, -5]), spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  /* ── GSAP accordion height + icon animation ── */
  const { contextSafe } = useGSAP({ scope: cardRef });

  const animateAccordion = contextSafe((open: boolean) => {
    const panel = panelRef.current;
    const icon = iconRef.current;
    const vertical = verticalRef.current;
    if (!panel) return;

    if (open) {
      gsap.to(panel, {
        height: panel.scrollHeight,
        duration: 0.5,
        ease: "elastic.out(0.6, 0.9)",
      });

      if (icon && vertical) {
        const tl = gsap.timeline({ overwrite: "auto" });
        tl.to(icon, { rotation: 45, duration: 0.2, ease: "power2.out" })
          .to(vertical, { scaleY: 0, opacity: 0, duration: 0.12, ease: "power2.out" }, "-=0.04")
          .to(icon, { rotation: 0, duration: 0.18, ease: "power2.out" });
      }
    } else {
      gsap.to(panel, {
        height: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });

      if (icon && vertical) {
        gsap.to(icon, { rotation: 0, duration: 0.15, ease: "power2.out", overwrite: "auto" });
        gsap.to(vertical, { scaleY: 1, opacity: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" });
      }
    }
  });

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (!panel.dataset.gsapInit) {
      gsap.set(panel, { height: 0 });
      panel.dataset.gsapInit = "1";
    }

    if (reduce) return;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    animateAccordion(isOpen);
  }, [isOpen, reduce, animateAccordion]);

  const headerId = `faq-header-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <motion.div
      ref={cardRef}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, y: floatY, transformPerspective: 1000 }
      }
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        className={cn(
          "group relative w-full cursor-pointer rounded-[18px] border bg-paper transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_24px_50px_-12px_rgba(10,10,10,0.18)]",
          isOpen
            ? "border-ink shadow-[0_28px_60px_-12px_rgba(10,10,10,0.22)] -translate-y-0.5 rotate-[1deg]"
            : "border-line shadow-[0_10px_30px_-14px_rgba(10,10,10,0.12)]",
          "dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_10px_30px_-14px_rgba(0,0,0,0.45)] dark:backdrop-blur-xl dark:hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)]",
          isOpen && "dark:border-white/40"
        )}
      >
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-[18px] dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-transparent"
        >
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink dark:text-paper">
            {item.q}
          </span>

          <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line dark:border-white/15">
            <span ref={iconRef} className="relative block h-3 w-3">
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink dark:bg-paper" />
              <span
                ref={verticalRef}
                className={
                  reduce && isOpen
                    ? "absolute left-1/2 top-1/2 h-2.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink dark:bg-paper scale-y-0 opacity-0 transition-all duration-200"
                    : "absolute left-1/2 top-1/2 h-2.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink dark:bg-paper"
                }
              />
            </span>
          </span>
        </button>

        <div ref={panelRef} className="overflow-hidden" role="region" aria-labelledby={headerId} aria-hidden={!isOpen}>
          <p className="px-6 pb-6 text-[14px] leading-[1.6] text-ink-soft dark:text-ink-mute">
            {item.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number>(-1);

  return (
    <section id="faq" className="section relative overflow-hidden">
      <div className="mx-auto w-full max-w-[900px] px-6">
        <SectionLabel>FAQ</SectionLabel>

        <Reveal className="mt-6 text-center">
          <h2 className="text-[clamp(1.75rem,3vw+8px,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink dark:text-paper">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="mx-auto mt-3 max-w-[480px] text-center text-[14px] leading-[1.55] text-ink-soft dark:text-ink-mute"
        >
          Everything you need to know about building, shipping, and scaling AI
          products with Funic X.
        </Reveal>

        <Stagger className="mt-10 flex flex-col gap-3" stagger={0.08}>
          {faqs.map((item, i) => (
            <motion.div key={item.q} variants={staggerItem}>
              <AccordionCard
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative overflow-hidden rounded-[16px] border border-line bg-paper px-6 py-8 text-center transition-all duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl">
            <h3 className="text-[clamp(1.1rem,1.6vw+4px,1.4rem)] font-semibold tracking-[-0.03em] text-ink dark:text-paper">
              Still have questions?
            </h3>
            <a
              href="#"
              className="group mt-4 inline-flex items-center gap-2 rounded-full border border-ink bg-transparent px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors duration-300 hover:bg-ink hover:text-paper dark:border-white dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
            >
              <span className="relative">Start a Project</span>
              <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
