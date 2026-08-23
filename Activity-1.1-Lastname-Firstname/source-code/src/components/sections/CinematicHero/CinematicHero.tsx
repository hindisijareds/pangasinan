"use client";

import { useEffect, useRef } from "react";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./CinematicHero.module.css";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function CinematicHero() {
  const sequence = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sequence.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerFine = window.matchMedia("(pointer: fine)");
    let frame = 0;

    const updateScroll = () => {
      if (reduceMotion.matches || window.innerWidth < 768) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const distance = Math.max(1, element.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / distance);
        const storyOne = clamp(1 - Math.abs(progress - 0.48) / 0.18);
        const storyTwo = clamp(1 - Math.abs(progress - 0.79) / 0.18);
        element.style.setProperty("--intro-opacity", String(clamp(1 - progress * 4)));
        element.style.setProperty("--story-one-opacity", String(storyOne));
        element.style.setProperty("--story-two-opacity", String(storyTwo));
        element.style.setProperty("--title-shift", `${progress * -72}px`);
        element.style.setProperty("--image-scale", String(1.04 + progress * 0.09));
      });
    };

    const updatePointer = (event: PointerEvent) => {
      if (reduceMotion.matches || !pointerFine.matches) return;
      const x = ((event.clientX / window.innerWidth) - 0.5) * -12;
      const y = ((event.clientY / window.innerHeight) - 0.5) * -8;
      element.style.setProperty("--pointer-x", `${x}px`);
      element.style.setProperty("--pointer-y", `${y}px`);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <section aria-label="Discover Pangasinan cinematic introduction" className={styles.sequence} ref={sequence}>
      <div className={styles.stage}>
        <ResponsiveImage
          alt=""
          className={styles.backdrop}
          fullBleed
          priority
          sizes="100vw"
          src="/images/hundred-islands.webp"
        />
        <div className={styles.shade} />
        <div aria-hidden="true" className={styles.grain} />

        <div className={styles.intro}>
          <div className={styles.introInner}>
            <Typography className={styles.eyebrow} variant="eyebrow">
              Province of Pangasinan · Philippines
            </Typography>
            <Typography as="h1" className={styles.title} variant="display">
              Pangasinan
            </Typography>
            <div className={styles.introBottom}>
              <Typography className={styles.lede} variant="body">
                Follow the coast, cross island waters, and meet the places where landscape and living culture shape a province.
              </Typography>
              <ul aria-label="Showcase themes" className={styles.pills}>
                {['Heritage', 'Nature', 'Culture'].map((pill) => (
                  <li className={styles.pill} key={pill}>{pill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <span aria-hidden="true" className={styles.scrollCue}>Scroll to journey</span>

        <div className={styles.stories}>
          <article className={styles.story} data-story="hundred-islands">
            <ResponsiveImage
              alt="Boats beside tree-covered Romulo Island in Hundred Islands National Park"
              className={styles.storyImage}
              fullBleed
              sizes="100vw"
              src="/images/hundred-islands.webp"
            />
            <div className={styles.storyContent}>
              <Typography className={styles.storyNumber} variant="eyebrow">01 · Alaminos City</Typography>
              <Typography as="h2" variant="heading">A horizon made of islands.</Typography>
              <Typography variant="body">Hundred Islands opens the journey with limestone forms, blue water, and the invitation to explore by boat.</Typography>
            </div>
          </article>

          <article className={styles.story} data-story="bolinao-lighthouse">
            <ResponsiveImage
              alt="Cape Bolinao Lighthouse framed by trees"
              className={styles.storyImage}
              fullBleed
              sizes="100vw"
              src="/images/bolinao-lighthouse.webp"
            />
            <div className={styles.storyContent}>
              <Typography className={styles.storyNumber} variant="eyebrow">02 · Bolinao</Typography>
              <Typography as="h2" variant="heading">A beacon at the western edge.</Typography>
              <Typography variant="body">Cape Bolinao Lighthouse stands above a coastal landscape shaped by travel, navigation, and long views toward the sea.</Typography>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
