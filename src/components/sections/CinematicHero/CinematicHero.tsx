import Link from "next/link";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import styles from "./CinematicHero.module.css";

export function CinematicHero() {
  return (
    <section aria-label="Welcome to Pangasinan" className={styles.hero}>
      <div className={styles.contentLeft}>
        <div className={styles.headerMeta} data-reveal="fade-up">
          <span className={styles.kicker}>
            <span>PANGASINAN / PHILIPPINES</span>
          </span>
        </div>
        
        <h1 className={styles.title} data-reveal="fade-up" data-delay="1">
          <span className={styles.titleLine}>Where land,</span>
          <span className={styles.titleLine}>water and memory</span>
          <span className={styles.titleLine}><em className={styles.italicText}>meet.</em></span>
        </h1>

        <p className={styles.supportText} data-reveal="fade-up" data-delay="2">
          Islands, coastlines, churches, and towns hold the stories of a province shaped by water, faith, and local life.
        </p>

        <Link className={styles.scrollCue} href="/heritage">
          Explore Heritage →
        </Link>
      </div>

      <div className={styles.contentRight}>
        <div className={styles.imageWrapper} data-reveal="clip" data-delay="3">
          <ResponsiveImage
            alt="Hundred Islands National Park"
            className={styles.backdrop}
            priority
            sizes="(max-width: 767px) 100vw, 45vw"
            src="/images/hundred-islands.webp"
          />
          <div className={styles.handwrittenAnnotation} data-reveal="fade-up" data-delay="4">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={styles.annotationArrow}>
              <path d="M5 5Q20 15 35 35M20 35H35V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className={styles.annotationText}>
              <span>HUNDRED ISLANDS / ALAMINOS</span>
              <span className={styles.coords}>NATURAL HERITAGE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
