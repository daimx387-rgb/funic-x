"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/use-lenis";

export function MotionShell() {
  useLenis();

  useEffect(() => {
    // Scroll progress + cursor glow follow
    const cursor = document.querySelector<HTMLElement>(".cursor-glow");
    const setProgress = () => {
      const max = document.body.scrollHeight - window.innerHeight || 1;
      document.documentElement.style.setProperty("--scroll", `${window.scrollY / max}`);
    };
    setProgress();

    const onPointer = (e: PointerEvent) => {
      if (cursor) cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("scroll", setProgress, { passive: true });
    window.addEventListener("lenis-scroll", setProgress);
    window.addEventListener("pointermove", onPointer, { passive: true });

    // GSAP parallax for floating shapes / blobs
    let ctx: { revert: () => void } | undefined;
    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0.2");
          gsap.to(el, {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });
    });

    return () => {
      window.removeEventListener("scroll", setProgress);
      window.removeEventListener("lenis-scroll", setProgress);
      window.removeEventListener("pointermove", onPointer);
      ctx?.revert();
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" />
      <div className="scroll-progress" />
    </>
  );
}
