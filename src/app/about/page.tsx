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
              src="/images/hundred-islands.jpg"
              alt="Hundred Islands National Park view"
              className={styles.heroImage}
              priority
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent} data-reveal="fade-up" data-delay="1">
            <span className={styles.heroEyebrow}>ABOUT THE PROVINCE</span>
            <h1 className={styles.heroTitle}>Pangasinan, shaped by land and water.</h1>
          </div>
        </section>

        {/* THE PROVINCE */}
        <section className={styles.section} data-reveal="fade-up">
          <div className={styles.columns}>
            <div>
              <span className={styles.sectionEyebrow}>IDENTITY & GEOGRAPHY</span>
              <h2 className={styles.sectionTitle}>A province defined by its coast and plains.</h2>
            </div>
            <div className={styles.bodyText}>
              <p>Pangasinan translates to &quot;place of salt-making,&quot; derived from &quot;asin&quot; (salt). This name speaks to its enduring connection to the sea, where for centuries coastal communities have worked the water.</p>
              <p>Yet it is equally a province of vast agricultural plains, winding rivers, and historic towns. The identity of Pangasinan is drawn from this balance of coastal vibrancy and quiet inland tradition.</p>
            </div>
          </div>
        </section>

        {/* LAND + WATER */}
        <section className={styles.splitSection} data-reveal="fade-up">
          <div className={styles.splitImageWrap} data-reveal="clip">
            <ResponsiveImage src="/images/patar-beach.jpg" alt="Patar Beach coastline" className={styles.splitImage} sizes="(max-width: 60rem) 100vw, 50vw" />
          </div>
          <div className={styles.bodyText}>
            <h2 className={styles.sectionTitle}>Between land and water.</h2>
            <p>The western coastline faces the West Philippine Sea, offering rugged shores, lighthouses, and island networks. This geography naturally fostered maritime trade and coastal living.</p>
            <p>Inland, the Agno River winds through the province, supporting agriculture and shaping the layout of municipalities and historic centers.</p>
          </div>
        </section>

        {/* FAITH + HISTORY */}
        <section className={styles.asymmetricGrid} data-reveal="fade-up">
          <div className={styles.bodyText}>
            <h2 className={styles.sectionTitle}>Stories built across generations.</h2>
            <p>The built environment of Pangasinan serves as a visible record of its history. From Spanish-era brick churches to American-period civic structures, the province preserves an architectural timeline.</p>
          </div>
          <div className={styles.asymImage1} data-reveal="clip">
            <ResponsiveImage src="/images/provincial-capitol.jpg" alt="Pangasinan Provincial Capitol" className={styles.splitImage} sizes="(max-width: 60rem) 100vw, 40vw" />
          </div>
          <div className={styles.asymImage2} data-reveal="clip" data-delay="1">
            <ResponsiveImage src="/images/manaoag-church.jpg" alt="Manaoag Church" className={styles.splitImage} sizes="(max-width: 60rem) 100vw, 30vw" />
          </div>
        </section>

        {/* HERITAGE TYPES */}
        <section className={styles.section} data-reveal="fade-up">
          <span className={styles.sectionEyebrow}>HERITAGE CLASSIFICATIONS</span>
          <div className={styles.typesGrid}>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Natural Heritage</h3>
              <p className={styles.bodyText}>Landscapes, islands, and ecological areas that shape the environmental character of the province.</p>
            </div>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Immovable Heritage</h3>
              <p className={styles.bodyText}>Historic structures, ruins, and monuments that represent the built history of local communities.</p>
            </div>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Religious Heritage</h3>
              <p className={styles.bodyText}>Churches, basilicas, and sites of faith that reflect centuries of religious devotion.</p>
            </div>
            <div className={styles.typeBlock}>
              <h3 className={styles.typeTitle}>Historic Landmarks</h3>
              <p className={styles.bodyText}>Civic centers and locations significant to local and national history.</p>
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
              src="/images/bolinao-lighthouse.jpg"
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
