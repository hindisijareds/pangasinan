import Link from "next/link";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./CinematicHero.module.css";

export function CinematicHero() {
  return (
    <section aria-label="Welcome to Pangasinan" className={styles.hero}>
      <div className={styles.backdropMotion} data-parallax="22">
        <ResponsiveImage
          alt="Boats moving between the tree-covered islands of Hundred Islands National Park"
          className={styles.backdrop}
          fullBleed
          priority
          sizes="100vw"
          src="/images/hundred-islands.webp"
        />
      </div>
      <div className={styles.shade} />
      <div aria-hidden="true" className={styles.grain} />

      <div className={styles.content}>
        <Typography className={styles.kicker} variant="eyebrow">
          <span>PANGASINAN / PHILIPPINES</span>
        </Typography>
        <Typography as="h1" className={styles.title} variant="heading">
          <span className={styles.titleLine}><span>Stories shaped by</span></span>
          <span className={styles.titleLine}><span>land, culture &amp; sea.</span></span>
        </Typography>
      </div>

      <Link aria-label="Scroll to the province story" className={styles.scrollCue} href="#province-story">
        <span aria-hidden="true">Scroll down</span>
        <span aria-hidden="true" className={styles.scrollLine} />
      </Link>
    </section>
  );
}
