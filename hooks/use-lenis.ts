"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, ScrollToPlugin } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // A Lenis instance already driving the window (e.g. the React Bits
    // ScrollStack with useWindowScroll) adds the `lenis` class to <html>.
    // Creating a second window-level Lenis would double-smooth the scroll,
    // so defer to the existing one and only wire up ScrollTrigger + anchors.
    const lenisAlreadyActive =
      document.documentElement.classList.contains("lenis");

    let lenis: any;
    let cancelled = false;
    let tickerFn: ((time: number) => void) | undefined;
    let onNativeScroll: (() => void) | undefined;

    if (!lenisAlreadyActive) {
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
    } else {
      // Keep GSAP ScrollTrigger in sync with the existing Lenis' native scroll.
      onNativeScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      ScrollTrigger.update();
    }

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
      } else {
        // Fallback when deferring to an external Lenis: use GSAP scrollTo
        // (ScrollToPlugin is registered in @/lib/gsap).
        gsap.to(window, {
          scrollTo: { y: el as HTMLElement, offsetY: 80 },
          duration: 1.2,
          ease: "power3.inOut",
        });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      if (onNativeScroll) window.removeEventListener("scroll", onNativeScroll);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      (window as any).__lenis = undefined;
    };
  }, []);
}
