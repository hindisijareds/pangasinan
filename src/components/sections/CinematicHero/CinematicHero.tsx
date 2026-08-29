import Link from "next/link";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./CinematicHero.module.css";

export function CinematicHero() {
  return (
    <section aria-label="Welcome to Pangasinan" className={styles.hero}>
      <ResponsiveImage
        alt="Boats moving between the tree-covered islands of Hundred Islands National Park"
        className={styles.backdrop}
        fullBleed
        priority
        sizes="100vw"
        src="/images/hundred-islands.webp"
      />
      <div className={styles.shade} />
      <div aria-hidden="true" className={styles.grain} />

      <div className={styles.content}>
        <Typography className={styles.kicker} variant="eyebrow">
          Heritage, coast &amp; culture
        </Typography>
        <Typography as="h1" className={styles.title} variant="heading">
          Welcome to Pangasinan
        </Typography>
      </div>

      <Link className={styles.scrollCue} href="#province-story">
        <span>Scroll down</span>
        <span aria-hidden="true" className={styles.scrollLine} />
      </Link>
    </section>
  );
}
