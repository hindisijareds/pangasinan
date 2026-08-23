import { Typography } from "@/components/atoms/Typography/Typography";
import { CinematicHero } from "@/components/sections/CinematicHero/CinematicHero";
import { HeritageCarousel } from "@/components/sections/HeritageCarousel/HeritageCarousel";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import { featuredSites } from "@/data/heritageSites";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <CinematicHero />
        <section aria-labelledby="province-story" className={styles.editorial}>
          <div className={styles.editorialInner}>
            <Typography as="h2" className={styles.editorialTitle} id="province-story" variant="heading">
              Between salt air, sacred places, and green foothills.
            </Typography>
            <div className={styles.editorialCopy}>
              <Typography variant="eyebrow">A living provincial story</Typography>
              <Typography variant="body">
                Pangasinan is experienced through many landscapes: the islands off Alaminos, the western coast of Bolinao, the civic avenues of Lingayen, and communities whose traditions continue in daily life.
              </Typography>
            </div>
          </div>
        </section>
        <HeritageCarousel sites={featuredSites} />
      </main>
      <SiteFooter />
    </>
  );
}
