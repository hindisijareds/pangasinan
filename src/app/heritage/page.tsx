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
            <Typography variant="eyebrow">Heritage collection</Typography>
            <Typography as="h1" variant="display">Explore Pangasinan</Typography>
            <Typography variant="body">
              Search a small, carefully structured collection of destinations across the province. Start with a place, a municipality, or the kind of experience you want to discover.
            </Typography>
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
