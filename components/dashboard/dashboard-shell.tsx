"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let lenis: any;
    let cancelled = false;
    let tickerFn: ((time: number) => void) | undefined;

    void import("@studio-freight/lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        syncTouch: false,
      });
      (window as any).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      (window as any).__lenis = undefined;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] antialiased">
      {children}
    </div>
  );
}
