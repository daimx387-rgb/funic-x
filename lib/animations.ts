"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function splitWords(el: HTMLElement) {
  if (el.querySelector(".rln-word")) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.nodeValue && n.nodeValue.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);

  nodes.forEach((tn) => {
    const parent = tn.parentNode;
    if (!parent) return;
    const frag = document.createDocumentFragment();
    tn.nodeValue!.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const mask = document.createElement("span");
      mask.className = "rln-mask";
      const word = document.createElement("span");
      word.className = "rln-word";
      word.textContent = part;
      mask.appendChild(word);
      frag.appendChild(mask);
    });
    parent.insertBefore(frag, tn);
    parent.removeChild(tn);
  });
}

export function initAnimations(scope: Element = document.body) {
  if (prefersReduced()) {
    const reset = () => {
      document
        .querySelectorAll<HTMLElement>("[data-anim='lines'] .rln-word")
        .forEach((w) => {
          w.style.transform = "";
        });
      document
        .querySelectorAll<HTMLElement>("[data-anim='fade-up'], [data-anim='tilt-3d']")
        .forEach((el) => {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.filter = "";
        });
    };
    return { revert: reset };
  }

  return gsap.context(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    /* ---- Parallax ---- */
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || "0.18");
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

    /* ---- Line-by-line / word reveal ---- */
    gsap.utils.toArray<HTMLElement>("[data-anim='lines']").forEach((el) => {
      splitWords(el);
      const words = el.querySelectorAll<HTMLElement>(".rln-word");
      if (!words.length) return;
      gsap.set(words, { yPercent: 115 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.055,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    /* ---- Fade up with subtle blur + scale ---- */
    gsap.utils.toArray<HTMLElement>("[data-anim='fade-up']").forEach((el) => {
      const delay = +(el.dataset.delay || 0);
      const blur = el.dataset.blur !== "false";
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y: 48,
          scale: 0.98,
          filter: blur ? "blur(8px)" : "none",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    /* ---- Smooth scale while scrolling ---- */
    gsap.utils.toArray<HTMLElement>("[data-scale-scroll]").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    /* ---- 3D dashboard reveal + pointer tilt ---- */
    gsap.utils.toArray<HTMLElement>("[data-anim='tilt-3d']").forEach((el) => {
      const parent = el.parentElement;
      if (parent) {
        parent.style.perspective = "1600px";
      }
      el.style.transformStyle = "preserve-3d";

      gsap.fromTo(
        el,
        { autoAlpha: 0, rotateX: 14, y: 70, scale: 0.95 },
        {
          autoAlpha: 1,
          rotateX: 0,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: "expo.out",
          transformOrigin: "center bottom",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );

      const onMove = (e: PointerEvent) => {
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)
          return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, {
          rotateY: px * 8,
          rotateX: -py * 8,
          duration: 0.6,
          ease: "power3.out",
          transformOrigin: "center center",
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      };
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
    });

    /* ---- Gentle floating decorations ---- */
    gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 ? -16 : -24,
        x: i % 3 ? 6 : -6,
        duration: 4 + i * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    /* ---- Hero mouse-follow glow ---- */
    const glow = document.querySelector<HTMLElement>("[data-hero-glow]");
    if (glow) {
      const host = glow.closest("section") || glow.parentElement;
      if (host) {
        const xTo = gsap.quickTo(glow, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(glow, "y", { duration: 0.7, ease: "power3.out" });
        let active = false;
        const move = (e: PointerEvent) => {
          if (!active) return;
          const r = (host as HTMLElement).getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        const enter = () => {
          active = true;
          gsap.to(glow, { autoAlpha: 1, duration: 0.5 });
        };
        const leave = () => {
          active = false;
          gsap.to(glow, { autoAlpha: 0, duration: 0.6 });
        };
        (host as HTMLElement).addEventListener("pointermove", move, { passive: true });
        (host as HTMLElement).addEventListener("pointerenter", enter);
        (host as HTMLElement).addEventListener("pointerleave", leave);
        gsap.set(glow, { autoAlpha: 0 });
      }
    }

    ScrollTrigger.refresh();
  }, scope);
}