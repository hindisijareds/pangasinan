import Link from "next/link";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { CinematicHero } from "@/components/sections/CinematicHero/CinematicHero";
import { ExperienceCarousel, type ExperienceCarouselItem } from "@/components/sections/ExperienceCarousel/ExperienceCarousel";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import styles from "./page.module.css";

const experiences: ExperienceCarouselItem[] = [
  {
    title: "Island nature",
    place: "Alaminos City",
    image: "/images/hundred-islands.jpg",
    href: "/heritage",
    alt: "Tree-covered islands and blue water in Hundred Islands National Park",
  },
  {
    title: "Coastal days",
    place: "Patar, Bolinao",
    image: "/images/patar-beach.jpg",
    href: "/heritage",
    alt: "The open shoreline and sea at Patar Beach",
  },
  {
    title: "Living faith",
    place: "Manaoag",
    image: "/images/manaoag-church.jpg",
    href: "/heritage",
    alt: "The facade and bell tower of Manaoag Church",
  },
  {
    title: "Civic heritage",
    place: "Lingayen",
    image: "/images/provincial-capitol.jpg",
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
              <span className={styles.indexNum}>02</span>
              <h2 id="province-story" className={styles.introEyebrow}>THE PROVINCE</h2>
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
        {/* SECTION 03 — CAPE BOLINAO */}
        <section aria-labelledby="lighthouse-heading" className={styles.bolinaoFeature}>
          <div className={styles.bolinaoVisual} data-reveal="clip">
            <ResponsiveImage
              alt="Cape Bolinao Lighthouse framed by trees"
              className={styles.bolinaoImage}
              sizes="(max-width: 767px) 100vw, 75vw"
              src="/images/bolinao-lighthouse.jpg"
            />
          </div>
          <div className={styles.bolinaoCopy} data-delay="1" data-reveal="fade-up">
            <div className={styles.bolinaoMeta}>
              <span className={styles.indexNum}>03</span>
              <span className={styles.metaEyebrow}>BOLINAO</span>
            </div>
            <h2 id="lighthouse-heading" className={styles.bolinaoHeading}>
              Cape Bolinao<br />Lighthouse
            </h2>
            <span className={styles.metaCategory}>IMMOVABLE HERITAGE</span>
            <p className={styles.bolinaoDesc}>
              Constructed during the Spanish colonial period in 1903, it stands on Punta Piedra Point overlooking the West Philippine Sea, guiding ships safely along the northwestern coast for more than a century.
            </p>
            <Link href="/heritage/cape-bolinao-light-house" className={styles.bolinaoAction}>
              Explore ↗
            </Link>
          </div>
        </section>

        {/* SECTION 04 — MANY FRAMES */}
        {/* SECTION 04 — MANY FRAMES */}
        <section aria-label="A journey across Pangasinan" className={styles.imageJourney}>
          <div className={styles.journeyIntro} data-reveal="fade-up">
            <span className={styles.indexNum}>04</span>
            <h2 className={styles.journeyHeading}>A province<br />in many frames.</h2>
          </div>
          
          <div className={styles.journeyImage1} data-reveal="clip">
            <ResponsiveImage alt="Cape Bolinao Lighthouse" sizes="(max-width: 767px) 100vw, 30vw" src="/images/bolinao-lighthouse.jpg" />
          </div>
          <div className={styles.journeyImage2} data-reveal="clip" data-delay="1">
            <ResponsiveImage alt="Hundred Islands" sizes="(max-width: 767px) 100vw, 50vw" src="/images/hundred-islands.jpg" />
          </div>
          <div className={styles.journeyImage3} data-reveal="clip" data-delay="2">
            <ResponsiveImage alt="Pangasinan Provincial Capitol" sizes="(max-width: 767px) 100vw, 25vw" src="/images/provincial-capitol.jpg" />
          </div>
          <div className={styles.journeyImage4} data-reveal="clip" data-delay="3">
            <ResponsiveImage alt="Manaoag Church" sizes="(max-width: 767px) 100vw, 40vw" src="/images/manaoag-church.jpg" />
          </div>
        </section>

        {/* SECTION 05 — UNHURRIED DAYS */}
        {/* SECTION 05 — UNHURRIED DAYS */}
        <section aria-labelledby="seasons-heading" className={styles.seasons}>
          <div className={styles.seasonsImageWrapper} data-reveal="clip">
            <ResponsiveImage
              alt="Boats and islands at Hundred Islands National Park"
              className={styles.seasonsImage}
              sizes="100vw"
              src="/images/hundred-islands.jpg"
            />
          </div>
          <div className={styles.seasonsCopy} data-delay="1" data-reveal="fade-up">
            <span className={styles.seasonsEyebrow}>MADE FOR UNHURRIED DAYS</span>
            <h2 id="seasons-heading" className={styles.seasonsHeading}>
              A different journey every season.
            </h2>
          </div>
        </section>

        {/* SECTION 06 — HERITAGE PREVIEW */}
        <section aria-labelledby="heritage-heading" className={styles.heritagePreview}>
          <div className={styles.previewHeader} data-reveal="fade-up">
            <span className={styles.indexNum}>06 / HERITAGE COLLECTION</span>
          </div>
          
          <div className={styles.previewList}>
            <Link href="/heritage" className={styles.previewItem} data-reveal="fade-up">
              <span className={styles.previewNum}>01</span>
              <h3 className={styles.previewTitle}>Hundred Islands</h3>
              <span className={styles.previewLoc}>ALAMINOS CITY</span>
              <div className={styles.previewImageReveal}>
                 <ResponsiveImage alt="Hundred Islands" sizes="30vw" src="/images/hundred-islands.jpg" />
              </div>
            </Link>
            
            <Link href="/heritage/cape-bolinao-light-house" className={styles.previewItem} data-reveal="fade-up" data-delay="1">
              <span className={styles.previewNum}>02</span>
              <h3 className={styles.previewTitle}>Cape Bolinao Lighthouse</h3>
              <span className={styles.previewLoc}>BOLINAO</span>
              <div className={styles.previewImageReveal}>
                 <ResponsiveImage alt="Cape Bolinao Lighthouse" sizes="30vw" src="/images/bolinao-lighthouse.jpg" />
              </div>
            </Link>
            
            <Link href="/heritage" className={styles.previewItem} data-reveal="fade-up" data-delay="2">
              <span className={styles.previewNum}>03</span>
              <h3 className={styles.previewTitle}>Manaoag Church</h3>
              <span className={styles.previewLoc}>MANAOAG</span>
              <div className={styles.previewImageReveal}>
                 <ResponsiveImage alt="Manaoag Church" sizes="30vw" src="/images/manaoag-church.jpg" />
              </div>
            </Link>
          </div>
          
          <div className={styles.previewFooter} data-reveal="fade-up">
             <Button href="/heritage" variant="ghost">View the collection <Icon name="arrow-right" /></Button>
          </div>
        </section>

        {/* SECTION 07 — EXPERIENCE PANGASINAN */}
        <section aria-labelledby="experiences-heading" className={styles.experiences}>
          <div className={styles.experiencesHeading} data-reveal="fade-up">
            <span className={styles.indexNum}>07 / EXPERIENCE PANGASINAN</span>
            <h2 id="experiences-heading" className={styles.experiencesTitle}>
              Find your way into the province.
            </h2>
          </div>
          <ExperienceCarousel items={experiences} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
