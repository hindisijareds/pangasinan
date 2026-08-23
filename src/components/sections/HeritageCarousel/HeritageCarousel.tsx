"use client";

import { useRef } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Typography } from "@/components/atoms/Typography/Typography";
import { HeritageCard } from "@/components/molecules/HeritageCard/HeritageCard";
import type { HeritageSite } from "@/types/heritage";
import styles from "./HeritageCarousel.module.css";

interface HeritageCarouselProps {
  sites: HeritageSite[];
}

export function HeritageCarousel({ sites }: HeritageCarouselProps) {
  const track = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const distance = Math.min(track.current?.clientWidth ?? 360, 460);
    track.current?.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="places-heading" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headingGroup}>
          <Typography variant="eyebrow">Places to begin</Typography>
          <Typography as="h2" id="places-heading" variant="heading">One province, many ways in.</Typography>
          <Typography variant="body">Move from island horizons to landmarks, springs, pilgrimage, and the civic heart of Pangasinan.</Typography>
        </div>
        <div aria-label="Destination carousel controls" className={styles.controls}>
          <Button aria-label="Previous destination" iconOnly onClick={() => move(-1)} type="button" variant="secondary">
            <Icon name="arrow-left" />
          </Button>
          <Button aria-label="Next destination" iconOnly onClick={() => move(1)} type="button" variant="secondary">
            <Icon name="arrow-right" />
          </Button>
        </div>
      </div>

      <div
        aria-label="Featured Pangasinan destinations"
        className={styles.track}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        ref={track}
        role="region"
        tabIndex={0}
      >
        {sites.map((site) => (
          <div className={styles.item} key={site.id}>
            <HeritageCard compact site={site} />
          </div>
        ))}
      </div>

      <div className={styles.footerLink}>
        <Button href="/heritage" variant="primary">
          Explore all sites <Icon name="arrow-up-right" />
        </Button>
      </div>
    </section>
  );
}
