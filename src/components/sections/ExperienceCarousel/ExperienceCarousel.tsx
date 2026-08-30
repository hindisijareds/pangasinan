"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { TransitionLink } from "@/components/motion/TransitionLink/TransitionLink";
import styles from "./ExperienceCarousel.module.css";

export interface ExperienceCarouselItem {
  alt: string;
  href: string;
  image: string;
  place: string;
  title: string;
}

export function ExperienceCarousel({ items }: Readonly<{ items: ExperienceCarouselItem[] }>) {
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [active, setActive] = useState(0);

  const moveTo = (index: number) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    const container = track.current;
    const item = container?.children[next] as HTMLElement | undefined;
    if (!container || !item) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({
      behavior: reduceMotion ? "auto" : "smooth",
      left: item.offsetLeft - (container.clientWidth - item.clientWidth) / 2,
    });
    setActive(next);
  };

  useEffect(() => () => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
  }, []);

  return (
    <div className={styles.carousel} data-reveal="fade-up" data-delay="1">
      <div className={styles.toolbar}>
        <span aria-live="polite" className={styles.position}>
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div aria-label="Experience carousel controls" className={styles.controls}>
          <Button
            aria-label="Previous experience"
            disabled={active === 0}
            iconOnly
            onClick={() => moveTo(active - 1)}
            type="button"
            variant="ghost"
          >
            <Icon name="arrow-left" />
          </Button>
          <Button
            aria-label="Next experience"
            disabled={active === items.length - 1}
            iconOnly
            onClick={() => moveTo(active + 1)}
            type="button"
            variant="ghost"
          >
            <Icon name="arrow-right" />
          </Button>
        </div>
      </div>

      <div
        aria-label="Ways to experience Pangasinan"
        className={styles.track}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveTo(active - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            moveTo(active + 1);
          }
        }}
        onScroll={() => {
          if (frame.current) return;
          frame.current = window.requestAnimationFrame(() => {
            frame.current = 0;
            const container = track.current;
            if (!container) return;
            const center = container.scrollLeft + container.clientWidth / 2;
            const children = [...container.children] as HTMLElement[];
            const closest = children.reduce((best, child, index) => {
              const childCenter = child.offsetLeft + child.clientWidth / 2;
              const distance = Math.abs(center - childCenter);
              return distance < best.distance ? { distance, index } : best;
            }, { distance: Number.POSITIVE_INFINITY, index: 0 });
            setActive(closest.index);
          });
        }}
        ref={track}
        role="region"
        tabIndex={0}
      >
        {items.map((item, index) => (
          <TransitionLink
            className={styles.card}
            data-active={active === index}
            href={item.href}
            key={item.title}
          >
            <div className={styles.image}>
              <ResponsiveImage
                alt={item.alt}
                sizes="(max-width: 767px) 86vw, (max-width: 1099px) 46vw, 30vw"
                src={item.image}
              />
            </div>
            <div className={styles.meta}>
              <span className={styles.number}>0{index + 1}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <span>{item.place}</span>
            </div>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
