import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Pangasinan",
  description: "Learn about Pangasinan's identity, geography, communities, and the purpose of the digital heritage project.",
};

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className={styles.main}>
        {/* HERO */}
        <section className={styles.hero} data-reveal="clip">
          <div className={styles.heroVisual}>
            <ResponsiveImage
              src="/images/hundred-islands.webp"
              alt="Hundred Islands National Park view"
              className={styles.heroImage}
              priority
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent} data-reveal="fade-up" data-delay="1">
            <span className={styles.heroEyebrow}>ABOUT THE PROVINCE</span>
            <h1 className={styles.heroTitle}>Pangasinan,<br />shaped by land<br />and water.</h1>
          </div>
        </section>

        {/* THE PROVINCE */}
        <section className={styles.section} data-reveal="fade-up">
          <div className={styles.columns}>
            <div>
              <span className={styles.sectionEyebrow}>IDENTITY & GEOGRAPHY</span>
              <h2 className={styles.sectionTitle}>A province read through its places.</h2>
            </div>
            <div className={styles.bodyText}>
              <p>The project&apos;s 41 records move across cities and municipalities, from Alaminos and Bolinao to Lingayen, Dagupan, Urdaneta, and communities farther inland.</p>
              <p>Together they form a portrait of Pangasinan through islands, beaches, rivers, civic buildings, churches, plazas, monuments, and the local communities that care for them.</p>
            </div>
          </div>
        </section>

        {/* LAND + WATER */}
        <section className={styles.splitSection} data-reveal="fade-up">
          <div className={styles.splitImageWrap} data-reveal="clip">
            <ResponsiveImage src="/images/patar-beach.webp" alt="Patar Beach coastline" className={styles.splitImage} sizes="(max-width: 60rem) 100vw, 50vw" />
          </div>
          <div className={styles.bodyText}>
            <h2 className={styles.sectionTitle}>Between land and water.</h2>
            <p>Water is a recurring presence across the collection. It appears in the islands of Alaminos, the shores of Bolinao and Binmaley, and river and waterfall records from San Quintin and Natividad.</p>
            <p>These natural places sit alongside the province&apos;s built heritage, revealing how landscape and settlement are documented together.</p>
          </div>
        </section>

        {/* FAITH + HISTORY */}
        <section className={styles.asymmetricGrid} data-reveal="fade-up">
          <div className={styles.bodyText}>
            <h2 className={styles.sectionTitle}>Stories built across generations.</h2>
            <p>Churches, municipal halls, plazas, monuments, and the Provincial Capitol give the archive a second rhythm: places shaped by faith, public life, memory, and civic identity.</p>
          </div>
          <div className={styles.asymImage1} data-reveal="clip">
            <ResponsiveImage src="/images/provincial-capitol.webp" alt="Pangasinan Provincial Capitol" className={styles.splitImage} sizes="(max-width: 60rem) 100vw, 40vw" />
          </div>
          <div className={styles.asymImage2} data-reveal="clip" data-delay="1">
            <ResponsiveImage src="/images/manaoag-church.webp" alt="Manaoag Church" className={styles.splitImage} sizes="(max-width: 60rem) 100vw, 30vw" />
          </div>
        </section>

        {/* HERITAGE TYPES */}
        <section className={styles.section} data-reveal="fade-up">
          <span className={styles.sectionEyebrow}>HERITAGE CLASSIFICATIONS</span>
          <div className={styles.typesGrid}>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Natural Heritage</h3>
              <p className={styles.bodyText}>The collection&apos;s islands, beaches, rivers, waterfalls, and spring areas.</p>
            </div>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Immovable Heritage</h3>
              <p className={styles.bodyText}>The archive&apos;s buildings, plazas, churches, monuments, bridges, and civic places.</p>
            </div>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Churches &amp; Faith</h3>
              <p className={styles.bodyText}>Religious sites are organized as a heritage type within the immovable collection.</p>
            </div>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Civic &amp; Historic Places</h3>
              <p className={styles.bodyText}>Municipal halls, parks, plazas, and monuments record public memory and local identity.</p>
            </div>
          </div>
        </section>

        {/* DIGITAL PROJECT */}
        <section className={styles.projectSection} data-reveal="fade-up">
          <div className={styles.projectInner}>
            <span className={styles.sectionEyebrow}>ABOUT THE PROJECT</span>
            <h2 className={styles.sectionTitle}>Pangasinan Heritage Digital Showcase</h2>
            <div className={styles.bodyText}>
              <p>This initiative focuses on preserving and presenting cultural and natural heritage through a modern digital experience.</p>
              <p>It organizes verified heritage information into an accessible and visually engaging digital archive, ensuring these stories are available for future generations.</p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className={styles.ctaSection} data-reveal="clip">
          <div className={styles.heroVisual}>
            <ResponsiveImage
              src="/images/bolinao-lighthouse.webp"
              alt="Cape Bolinao Lighthouse"
              className={styles.heroImage}
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.ctaContent} data-reveal="fade-up">
            <h2 className={styles.sectionTitle} style={{ color: "inherit", margin: 0 }}>Explore the places<br />that tell Pangasinan&apos;s story.</h2>
            <Button href="/heritage" variant="primary">Explore Heritage <Icon name="arrow-right" /></Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
