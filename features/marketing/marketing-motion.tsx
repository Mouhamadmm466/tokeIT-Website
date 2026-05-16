"use client";

import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MarketingMotionProps = {
  scopeSelector: string;
};

export function MarketingMotion({ scopeSelector }: MarketingMotionProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scope = document.querySelector(scopeSelector);

    if (!scope || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.from("[data-nav-shell]", {
        y: -24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from("[data-hero-actions]", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from("[data-hero-copy]", {
        y: 16,
        opacity: 0,
        duration: 0.9,
        delay: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-card-pop]").forEach((element) => {
        gsap.from(element, {
          scale: 0.97,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
          },
        });
      });

      gsap.from("[data-workflow-primary]", {
        rotate: -4,
        y: 34,
        opacity: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-workflow]",
          start: "top 70%",
        },
      });

      gsap.from("[data-workflow-secondary]", {
        rotate: 10,
        x: 32,
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-workflow]",
          start: "top 64%",
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-counter-value]").forEach((element) => {
        const target = Number(element.dataset.counterValue ?? "0");
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
          },
          onUpdate: () => {
            element.textContent = Math.round(state.value).toString();
          },
        });
      });
    }, scope);

    return () => {
      context.revert();
    };
  }, [scopeSelector]);

  return null;
}
