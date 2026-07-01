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

      const showcaseSection = scope.querySelector<HTMLElement>("[data-showcase-section]");
      const showcasePin = scope.querySelector<HTMLElement>("[data-showcase-pin]");
      const showcaseStage = scope.querySelector<HTMLElement>("[data-showcase-stage]");
      const showcaseDepthBack = scope.querySelector<HTMLElement>("[data-showcase-depth-back]");
      const showcaseDepthMid = scope.querySelector<HTMLElement>("[data-showcase-depth-mid]");
      const showcaseDepthFront = scope.querySelector<HTMLElement>("[data-showcase-depth-front]");
      const showcaseSlides = gsap.utils.toArray<HTMLElement>("[data-showcase-slide]");
      const showcaseRailItems = gsap.utils.toArray<HTMLElement>("[data-showcase-rail-item]");

      if (
        showcaseSection &&
        showcasePin &&
        showcaseStage &&
        showcaseSlides.length > 1 &&
        window.matchMedia("(min-width: 1101px)").matches
      ) {
        gsap.set(showcaseSlides, {
          autoAlpha: 0,
          y: 28,
          scale: 0.985,
        });

        gsap.set(showcaseRailItems, { opacity: 0.34 });
        gsap.set(showcaseSlides[0], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });

        if (showcaseRailItems[0]) {
          gsap.set(showcaseRailItems[0], { opacity: 1 });
        }

        const showcaseTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: showcasePin,
            start: "top top",
            end: `+=${window.innerHeight * (showcaseSlides.length * 1.05)}`,
            scrub: 1.1,
            pin: showcasePin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (showcaseDepthBack) {
          showcaseTimeline.to(
            showcaseDepthBack,
            {
              yPercent: -10,
              xPercent: -5,
              ease: "none",
            },
            0,
          );
        }

        if (showcaseDepthMid) {
          showcaseTimeline.to(
            showcaseDepthMid,
            {
              yPercent: -18,
              xPercent: 6,
              ease: "none",
            },
            0,
          );
        }

        if (showcaseDepthFront) {
          showcaseTimeline.to(
            showcaseDepthFront,
            {
              yPercent: -24,
              xPercent: 10,
              ease: "none",
            },
            0,
          );
        }

        showcaseSlides.forEach((slide, index) => {
          if (index === 0) {
            return;
          }

          const previousSlide = showcaseSlides[index - 1];
          const previousRailItem = showcaseRailItems[index - 1];
          const currentRailItem = showcaseRailItems[index];
          const handoffAt = index * 0.24;

          showcaseTimeline.to(
            previousSlide,
            {
              autoAlpha: 0,
              y: -14,
              scale: 0.992,
              ease: "none",
              duration: 0.11,
            },
            handoffAt,
          );

          if (previousRailItem) {
            showcaseTimeline.to(
              previousRailItem,
              {
                opacity: 0.34,
                ease: "none",
                duration: 0.11,
              },
              handoffAt,
            );
          }

          showcaseTimeline.to(
            slide,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              ease: "none",
              duration: 0.14,
            },
            handoffAt + 0.03,
          );

          if (currentRailItem) {
            showcaseTimeline.to(
              currentRailItem,
              {
                opacity: 1,
                ease: "none",
                duration: 0.12,
              },
              handoffAt + 0.03,
            );
          }
        });

        showcaseTimeline.to(
          showcaseStage,
          {
            scale: 1.008,
            ease: "none",
          },
          0,
        );
      }
    }, scope);

    return () => {
      context.revert();
    };
  }, [scopeSelector]);

  return null;
}
