import type { Metadata } from "next";
import { Typography } from "@/components/atoms/Typography/Typography";
import { HeritageGrid } from "@/components/organisms/HeritageGrid/HeritageGrid";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import { heritageSites } from "@/data/heritageSites";
import styles from "./heritage.module.css";

export const metadata: Metadata = {
  title: "Explore Pangasinan Heritage Sites",
  description:
    "Browse and search a curated collection of Pangasinan nature, built heritage, faith, civic, and coastal destinations.",
};

export default function HeritagePage() {
  return (
    <>
      <main className={styles.main} id="main-content">
        <section className={styles.intro} data-reveal="fade-up">
          <div className={styles.introInner}>
            <span className={styles.introEyebrow}>HERITAGE ARCHIVE</span>
            <Typography as="h1" variant="display" className={styles.introTitle}>Places that<br />carry our stories.</Typography>
            <Typography variant="body" className={styles.introSupport}>
              Browse and discover natural heritage, immovable heritage, historic landmarks, and bodies of water across the province.
            </Typography>
            <span className={styles.countText}>41 documented places</span>
          </div>
        </section>
        <div className={styles.collection}>
          <div className={styles.collectionInner}>
            <HeritageGrid sites={heritageSites} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
