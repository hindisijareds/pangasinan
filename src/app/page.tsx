import Link from "next/link";
import { Button } from "@/components/atoms/Button/Button";

import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { CinematicHero } from "@/components/sections/CinematicHero/CinematicHero";
import { ExperienceCarousel, type ExperienceCarouselItem } from "@/components/sections/ExperienceCarousel/ExperienceCarousel";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import styles from "./page.module.css";

const experiences: ExperienceCarouselItem[] = [
  {
    title: "Island nature",
    place: "Alaminos City",
    image: "/images/hundred-islands.webp",
    href: "/heritage",
    alt: "Tree-covered islands and blue water in Hundred Islands National Park",
  },
  {
    title: "Coastal days",
    place: "Patar, Bolinao",
    image: "/images/patar-beach.webp",
    href: "/heritage",
    alt: "The open shoreline and sea at Patar Beach",
  },
  {
    title: "Living faith",
    place: "Manaoag",
    image: "/images/manaoag-church.webp",
    href: "/heritage",
    alt: "The facade and bell tower of Manaoag Church",
  },
  {
    title: "Civic heritage",
    place: "Lingayen",
    image: "/images/provincial-capitol.webp",
    href: "/heritage",
    alt: "Pangasinan Provincial Capitol beneath a blue sky",
  },
];

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <CinematicHero />

        {/* SECTION 02 — THE PROVINCE */}
        <section aria-labelledby="province-story" className={styles.intro}>
          <div className={styles.introGrid}>
            <div className={styles.introMeta} data-reveal="fade-up">
              <span className={styles.indexNum}>01</span>
              <h2 id="province-story" className={styles.introEyebrow}>DISCOVER PANGASINAN</h2>
            </div>
            <div className={styles.introStatement} data-reveal="fade-up" data-delay="1">
              More than a destination.
            </div>
            <div className={styles.introSupport} data-reveal="fade-up" data-delay="2">
              <p>Pangasinan is home to natural heritage, historical landmarks, coastal destinations, and important civic and religious sites that tell the story of a province rich in both nature and culture.</p>
              <p>Discover a deep legacy shaped over centuries, where every town holds a narrative waiting to be explored.</p>
            </div>
          </div>
        </section>

        {/* SECTION 03 — CAPE BOLINAO */}
        <section aria-labelledby="lighthouse-heading" className={styles.bolinaoFeature}>
          <div className={styles.bolinaoVisual} data-reveal="clip">
            <ResponsiveImage
              alt="Cape Bolinao Lighthouse framed by trees"
              className={styles.bolinaoImage}
              sizes="(max-width: 767px) 100vw, 75vw"
              src="/images/bolinao-lighthouse.webp"
            />
          </div>
          <div className={styles.bolinaoCopy} data-delay="1" data-reveal="fade-up">
            <div className={styles.bolinaoMeta}>
              <span className={styles.indexNum}>02</span>
              <span className={styles.metaEyebrow}>IMMOVABLE HERITAGE</span>
            </div>
            <span className={styles.metaCategory}>BOLINAO</span>
            <h2 id="lighthouse-heading" className={styles.bolinaoHeading}>
              Cape Bolinao<br />Lighthouse
            </h2>
            <p className={styles.bolinaoDesc}>
              Constructed during the Spanish colonial period in 1903, it stands on Punta Piedra Point overlooking the West Philippine Sea, guiding ships safely along the northwestern coast for more than a century.
            </p>
            <Link href="/heritage/cape-bolinao-light-house" className={styles.bolinaoAction}>
              View Heritage →
            </Link>
          </div>
        </section>

        {/* SECTION 04 — MANY FRAMES */}
        <section aria-label="A journey across Pangasinan" className={styles.imageJourney}>
          <div className={styles.journeyIntro} data-reveal="fade-up">
            <h2 className={styles.journeyHeading}>A province<br />in many frames.</h2>
          </div>
          
          <div className={styles.journeyImage1} data-reveal="clip">
            <ResponsiveImage alt="Cape Bolinao Lighthouse" className={styles.journeyMedia} sizes="(max-width: 767px) 100vw, 30vw" src="/images/bolinao-lighthouse.webp" />
            <span className={styles.journeyCaption}>BOLINAO<br/>Cape Bolinao Lighthouse</span>
          </div>
          <div className={styles.journeyImage2} data-reveal="clip" data-delay="1">
            <ResponsiveImage alt="Hundred Islands" className={styles.journeyMedia} sizes="(max-width: 767px) 100vw, 50vw" src="/images/hundred-islands.webp" />
            <span className={styles.journeyCaption}>ALAMINOS<br/>Hundred Islands</span>
          </div>
          <div className={styles.journeyImage3} data-reveal="clip" data-delay="2">
            <ResponsiveImage alt="Pangasinan Provincial Capitol" className={styles.journeyMedia} sizes="(max-width: 767px) 100vw, 25vw" src="/images/provincial-capitol.webp" />
            <span className={styles.journeyCaption}>LINGAYEN<br/>Provincial Capitol</span>
          </div>
          <div className={styles.journeyImage4} data-reveal="clip" data-delay="3">
            <ResponsiveImage alt="Manaoag Church" className={styles.journeyMedia} sizes="(max-width: 767px) 100vw, 40vw" src="/images/manaoag-church.webp" />
            <span className={styles.journeyCaption}>MANAOAG<br/>Manaoag Church</span>
          </div>
        </section>

        {/* SECTION 05 — HERITAGE CATEGORIES */}
        <section aria-labelledby="heritage-categories-heading" className={styles.seasons}>
          <div className={styles.seasonsImageWrapper} data-reveal="clip">
            <ResponsiveImage
              alt="Boats and islands at Hundred Islands National Park"
              className={styles.seasonsImage}
              sizes="100vw"
              src="/images/hundred-islands.webp"
            />
          </div>
          <div className={styles.seasonsCopy} data-delay="1" data-reveal="fade-up">
            <h2 id="heritage-categories-heading" className={styles.seasonsHeading}>
              Stories shaped<br />by centuries.
            </h2>
            <div className={styles.categoryLinks}>
              <Link href="/heritage" className={styles.categoryLink}>Natural Heritage</Link>
              <Link href="/heritage" className={styles.categoryLink}>Immovable Heritage</Link>
              <Link href="/heritage" className={styles.categoryLink}>Religious Heritage</Link>
              <Link href="/heritage" className={styles.categoryLink}>Bodies of Water</Link>
              <Link href="/heritage" className={styles.categoryLink}>Historic Landmarks</Link>
            </div>
          </div>
        </section>

        {/* SECTION 06 — FEATURED JOURNEYS */}
        <section aria-labelledby="experiences-heading" className={styles.experiences}>
          <div className={styles.experiencesHeading} data-reveal="fade-up">
            <span className={styles.indexNum}>03 / FEATURED JOURNEYS</span>
            <h2 id="experiences-heading" className={styles.experiencesTitle}>Ways into the province.</h2>
          </div>
          <ExperienceCarousel items={experiences} />
        </section>

        {/* SECTION 07 — EXPLORE CTA */}
        <section aria-labelledby="explore-heading" className={styles.exploreCta}>
          <div className={styles.exploreCtaContent} data-reveal="fade-up">
            <h2 id="explore-heading" className={styles.exploreCtaTitle}>
              41 places.<br />One province.<br />Countless stories.
            </h2>
            <Button href="/heritage" variant="primary">Explore Pangasinan Heritage →</Button>
          </div>
          <div className={styles.exploreCtaImage} data-reveal="clip" data-delay="1">
             <ResponsiveImage alt="Patar Beach shoreline" sizes="100vw" src="/images/patar-beach.webp" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
