import Link from "next/link";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./CinematicHero.module.css";

export function CinematicHero() {
  return (
    <section aria-label="Welcome to Pangasinan" className={styles.hero}>
      <div className={styles.contentLeft}>
        <div className={styles.headerMeta}>
          <Typography className={styles.kicker} variant="eyebrow">
            <span>01 / DISCOVER</span><br/>
            <span>PANGASINAN / PHILIPPINES</span>
          </Typography>
        </div>
        
        <Typography as="h1" className={styles.title} variant="display">
          <span className={styles.titleLine}><span>STORIES</span></span>
          <span className={styles.titleLine}><span>SHAPED BY</span></span>
          <span className={styles.titleLine}><span>LAND,</span></span>
          <span className={styles.titleLine}><span>CULTURE</span></span>
          <span className={styles.titleLine}><span>&amp; SEA.</span></span>
        </Typography>

        <Link aria-label="Scroll to the province story" className={styles.scrollCue} href="#province-story">
          <span aria-hidden="true">Scroll down</span>
          <span aria-hidden="true" className={styles.scrollLine} />
        </Link>
      </div>

      <div className={styles.contentRight}>
        <div className={styles.imageWrapper}>
          <ResponsiveImage
            alt="Hundred Islands National Park"
            className={styles.backdrop}
            fullBleed
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            src="/images/hundred-islands.webp"
          />
        </div>
        <div aria-hidden="true" className={styles.grain} />
      </div>
    </section>
  );
}
