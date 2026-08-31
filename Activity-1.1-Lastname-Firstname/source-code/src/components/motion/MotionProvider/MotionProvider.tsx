"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./MotionProvider.module.css";

type TransitionPhase = "covered" | "covering" | "revealing" | "idle";

interface MotionContextValue {
  beginNavigation: (href: string) => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

function isCinematicRoute(pathname: string) {
  return pathname === "/" || pathname.startsWith("/heritage");
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MotionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const target = useRef<string | null>(null);
  const navigationTimer = useRef<number>();
  const fallbackTimer = useRef<number>();
  const revealTimer = useRef<number>();

  useEffect(() => {
    if (phase !== "covered") return;
    const frame = window.requestAnimationFrame(() => {
      setPhase("revealing");
      revealTimer.current = window.setTimeout(() => setPhase("idle"), 680);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (!target.current || target.current !== pathname) return;
    target.current = null;
    setPhase("revealing");
    window.scrollTo({ top: 0, behavior: "auto" });
    if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
    revealTimer.current = window.setTimeout(() => setPhase("idle"), 680);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (!isCinematicRoute(pathname)) {
      delete root.dataset.motion;
      return;
    }
    root.dataset.motion = "ready";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new WeakSet<Element>();

    const reveal = (element: Element) => {
      (element as HTMLElement).dataset.visible = "true";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    const register = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        if (reduceMotion.matches) reveal(element);
        else if (element.dataset.reveal === "clip") return;
        else observer.observe(element);
      });
    };

    register(document);
    const mutations = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        entry.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]")) {
            if (reduceMotion.matches) reveal(node);
            else if (!observed.has(node)) {
              observed.add(node);
              observer.observe(node);
            }
          }
          register(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const enabled = !reduceMotion.matches && window.innerWidth >= 768;
      const viewport = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-reveal="clip"]:not([data-visible="true"])').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (reduceMotion.matches || (rect.top < viewport * 0.88 && rect.bottom > viewport * 0.08)) reveal(element);
      });
      const updates = [...document.querySelectorAll<HTMLElement>("[data-parallax]")].map((element) => {
        if (!enabled) return { element, offset: 0 };
        const rect = element.getBoundingClientRect();
        const progress = (viewport - rect.top) / Math.max(1, viewport + rect.height);
        const strength = Number(element.dataset.parallax || 28);
        const offset = Math.max(-48, Math.min(48, (progress - 0.5) * strength * 2));
        return { element, offset };
      });
      updates.forEach(({ element, offset }) => element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`));
    };

    const requestParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    reduceMotion.addEventListener("change", requestParallax);

    return () => {
      delete root.dataset.motion;
      observer.disconnect();
      mutations.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      reduceMotion.removeEventListener("change", requestParallax);
    };
  }, [pathname]);

  useEffect(() => () => {
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
  }, []);

  const beginNavigation = useCallback((href: string) => {
    const nextPath = href.split(/[?#]/)[0] || "/";
    if (target.current) return;
    if (
      prefersReducedMotion()
      || !isCinematicRoute(pathname)
      || !isCinematicRoute(nextPath)
      || nextPath === pathname
    ) {
      router.push(href);
      return;
    }

    target.current = nextPath;
    setPhase("covering");
    navigationTimer.current = window.setTimeout(() => router.push(href), 380);
    fallbackTimer.current = window.setTimeout(() => {
      target.current = null;
      setPhase("idle");
    }, 1800);
  }, [pathname, router]);

  return (
    <MotionContext.Provider value={{ beginNavigation }}>
      {children}
      <div aria-hidden="true" className={styles.curtain} data-phase={phase}>
        <div className={styles.creamPanel} />
        <div className={styles.greenPanel}>
          <span className={styles.curtainMark}>P</span>
        </div>
      </div>
    </MotionContext.Provider>
  );
}

export function useMotionNavigation() {
  const value = useContext(MotionContext);
  if (!value) throw new Error("useMotionNavigation must be used within MotionProvider");
  return value;
}
