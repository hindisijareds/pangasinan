"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

interface ScrollStop {
  itemIndex: number;
  left: number;
}

function getScrollStops(container: HTMLDivElement): ScrollStop[] {
  const children = [...container.children] as HTMLElement[];
  if (!children.length) return [];

  const containerRect = container.getBoundingClientRect();
  const paddingStart = Number.parseFloat(getComputedStyle(container).scrollPaddingLeft) || 0;
  const maximum = Math.max(0, container.scrollWidth - container.clientWidth);
  const stops: ScrollStop[] = [];

  children.forEach((item, itemIndex) => {
    const itemRect = item.getBoundingClientRect();
    const rawLeft = container.scrollLeft + itemRect.left - containerRect.left - paddingStart;
    const left = Math.max(0, Math.min(maximum, rawLeft));
    const previous = stops.at(-1);

    if (previous && Math.abs(previous.left - left) < 2) {
      // At the end of a wide carousel several cards can share the same
      // maximum scroll position. Represent that final stop with the last card.
      previous.itemIndex = itemIndex;
      return;
    }

    stops.push({ itemIndex, left });
  });

  return stops;
}

export function ExperienceCarousel({ items }: Readonly<{ items: ExperienceCarouselItem[] }>) {
  const track = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<number>();
  const stopIndex = useRef(0);
  const [active, setActive] = useState(0);
  const [activeStop, setActiveStop] = useState(0);
  const [stopCount, setStopCount] = useState(Math.max(1, items.length));

  const updatePosition = useCallback((stops: ScrollStop[], index: number) => {
    if (!stops.length) return;
    const next = Math.max(0, Math.min(stops.length - 1, index));
    stopIndex.current = next;
    setActiveStop(next);
    setStopCount(stops.length);
    setActive(stops[next].itemIndex);
  }, []);

  const moveBy = (direction: -1 | 1) => {
    const container = track.current;
    if (!container) return;
    const stops = getScrollStops(container);
    if (!stops.length) return;
    const next = Math.max(0, Math.min(stops.length - 1, stopIndex.current + direction));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({
      behavior: reduceMotion ? "auto" : "smooth",
      left: stops[next].left,
    });
    updatePosition(stops, next);
  };

  useEffect(() => {
    const container = track.current;
    if (!container) return;

    const synchronize = () => {
      const stops = getScrollStops(container);
      if (!stops.length) return;
      const nearest = stops.reduce((best, stop, index) => {
        const distance = Math.abs(container.scrollLeft - stop.left);
        return distance < best.distance ? { distance, index } : best;
      }, { distance: Number.POSITIVE_INFINITY, index: 0 });
      updatePosition(stops, nearest.index);
    };

    synchronize();
    window.addEventListener("resize", synchronize);
    return () => {
      window.removeEventListener("resize", synchronize);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, [items.length, updatePosition]);

  return (
    <div className={styles.carousel} data-reveal="fade-up" data-delay="1">
      <div className={styles.toolbar}>
        <span aria-live="polite" className={styles.position}>
          {String(activeStop + 1).padStart(2, "0")} / {String(stopCount).padStart(2, "0")}
        </span>
        <div aria-label="Experience carousel controls" className={styles.controls}>
          <Button
            aria-label="Previous experience"
            disabled={activeStop === 0}
            iconOnly
            onClick={() => moveBy(-1)}
            type="button"
            variant="ghost"
          >
            <Icon name="arrow-left" />
          </Button>
          <Button
            aria-label="Next experience"
            disabled={activeStop === stopCount - 1}
            iconOnly
            onClick={() => moveBy(1)}
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
            moveBy(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            moveBy(1);
          }
        }}
        onScroll={() => {
          if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
          scrollTimer.current = window.setTimeout(() => {
            const container = track.current;
            if (!container) return;
            const stops = getScrollStops(container);
            if (!stops.length) return;
            const closest = stops.reduce((best, stop, index) => {
              const distance = Math.abs(container.scrollLeft - stop.left);
              return distance < best.distance ? { distance, index } : best;
            }, { distance: Number.POSITIVE_INFINITY, index: 0 });
            updatePosition(stops, closest.index);
          }, 120);
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
