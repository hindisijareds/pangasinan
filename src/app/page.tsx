import Link from "next/link";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
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

        {/* SECTION 02 — MANIFESTO */}
        <section aria-labelledby="province-story" className={styles.manifesto}>
          <div className={styles.manifestoGrid}>
            <div className={styles.manifestoHeader} data-reveal="fade-up">
              <span className={styles.manifestoNum}>02</span>
              <Typography as="h2" id="province-story" variant="eyebrow" className={styles.manifestoEyebrow}>
                MORE THAN A DESTINATION.
              </Typography>
            </div>
            <Typography className={styles.manifestoStatement} as="p" data-reveal="fade-up" data-delay="1" variant="heading">
              Pangasinan is home to natural heritage, historical landmarks, coastal destinations, and important civic and religious sites that tell the story of a province rich in both nature and culture.
            </Typography>
            <Typography className={styles.manifestoSupport} data-reveal="fade-up" data-delay="2" variant="body">
              Discover a deep legacy shaped over centuries, where every town holds a narrative waiting to be explored.
            </Typography>
          </div>
        </section>

        {/* SECTION 03 — CAPE BOLINAO */}
        <section aria-labelledby="lighthouse-heading" className={styles.splitStory}>
          <div className={styles.splitVisual} data-reveal="clip">
            <ResponsiveImage
              alt="Cape Bolinao Lighthouse framed by trees"
              className={styles.portraitImage}
              parallax={12}
              sizes="(max-width: 767px) 100vw, 65vw"
              src="/images/bolinao-lighthouse.webp"
            />
          </div>
          <div className={styles.splitCopy} data-delay="1" data-reveal="fade-up">
            <div className={styles.splitMeta}>
              <span className={styles.indexNum}>03</span>
              <Typography variant="eyebrow">BOLINAO / IMMOVABLE HERITAGE</Typography>
            </div>
            <Typography as="h2" id="lighthouse-heading" variant="display" className={styles.splitHeading}>
              Cape Bolinao Lighthouse
            </Typography>
            <Typography variant="body" className={styles.splitDesc}>
              Constructed during the Spanish colonial period in 1903, it stands on Punta Piedra Point overlooking the West Philippine Sea, guiding ships safely along the northwestern coast for more than a century.
            </Typography>
            <Button href="/heritage/cape-bolinao-light-house" variant="ghost" className={styles.splitAction}>
              Explore <Icon name="arrow-up-right" />
            </Button>
          </div>
        </section>

        {/* SECTION 04 — MANY FRAMES */}
        <section aria-label="A journey across Pangasinan" className={styles.imageJourney}>
          <div className={styles.journeyIntro} data-reveal="fade-up">
            <span className={styles.indexNum}>04</span>
            <Typography as="h2" variant="display" className={styles.journeyHeading}>
              A province in many frames.
            </Typography>
          </div>
          
          <div className={styles.journeyImage1} data-reveal="clip">
            <ResponsiveImage alt="Cape Bolinao Lighthouse" sizes="(max-width: 767px) 70vw, 25vw" src="/images/bolinao-lighthouse.webp" parallax={25} />
          </div>
          <div className={styles.journeyImage2} data-reveal="clip" data-delay="1">
            <ResponsiveImage alt="Hundred Islands" sizes="(max-width: 767px) 90vw, 45vw" src="/images/hundred-islands.webp" parallax={15} />
          </div>
          <div className={styles.journeyImage3} data-reveal="clip" data-delay="2">
            <ResponsiveImage alt="Pangasinan Provincial Capitol" sizes="(max-width: 767px) 60vw, 30vw" src="/images/provincial-capitol.webp" parallax={35} />
          </div>
          <div className={styles.journeyImage4} data-reveal="clip" data-delay="3">
            <ResponsiveImage alt="Manaoag Church" sizes="(max-width: 767px) 80vw, 40vw" src="/images/manaoag-church.webp" parallax={20} />
          </div>
        </section>

        {/* SECTION 05 — UNHURRIED DAYS */}
        <section aria-labelledby="seasons-heading" className={styles.seasons}>
          <div className={styles.seasonsImageWrapper} data-reveal="clip">
            <ResponsiveImage
              alt="Boats and islands at Hundred Islands National Park"
              className={styles.seasonsImage}
              parallax={18}
              fullBleed
              sizes="100vw"
              src="/images/hundred-islands.webp"
            />
          </div>
          <div className={styles.seasonsCopy} data-delay="1" data-reveal="fade-up">
            <Typography variant="eyebrow" className={styles.seasonsEyebrow}>MADE FOR UNHURRIED DAYS</Typography>
            <Typography as="h2" id="seasons-heading" variant="display" className={styles.seasonsHeading}>
              A different journey every season.
            </Typography>
          </div>
        </section>

        {/* SECTION 06 — HERITAGE PREVIEW */}
        <section aria-labelledby="heritage-heading" className={styles.heritagePreview}>
          <div className={styles.previewHeader} data-reveal="fade-up">
            <Typography variant="eyebrow">06 / HERITAGE COLLECTION</Typography>
          </div>
          
          <div className={styles.previewList}>
            <Link href="/heritage" className={styles.previewItem} data-reveal="fade-up">
              <span className={styles.previewNum}>01</span>
              <h3 className={styles.previewTitle}>Hundred Islands</h3>
              <span className={styles.previewLoc}>ALAMINOS CITY</span>
              <div className={styles.previewImageReveal}>
                 <ResponsiveImage alt="Hundred Islands" sizes="30vw" src="/images/hundred-islands.webp" />
              </div>
            </Link>
            
            <Link href="/heritage/cape-bolinao-light-house" className={styles.previewItem} data-reveal="fade-up" data-delay="1">
              <span className={styles.previewNum}>02</span>
              <h3 className={styles.previewTitle}>Cape Bolinao Lighthouse</h3>
              <span className={styles.previewLoc}>BOLINAO</span>
              <div className={styles.previewImageReveal}>
                 <ResponsiveImage alt="Cape Bolinao Lighthouse" sizes="30vw" src="/images/bolinao-lighthouse.webp" />
              </div>
            </Link>
            
            <Link href="/heritage" className={styles.previewItem} data-reveal="fade-up" data-delay="2">
              <span className={styles.previewNum}>03</span>
              <h3 className={styles.previewTitle}>Manaoag Church</h3>
              <span className={styles.previewLoc}>MANAOAG</span>
              <div className={styles.previewImageReveal}>
                 <ResponsiveImage alt="Manaoag Church" sizes="30vw" src="/images/manaoag-church.webp" />
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
            <Typography variant="eyebrow">07 / EXPERIENCE PANGASINAN</Typography>
            <Typography as="h2" id="experiences-heading" variant="display" className={styles.experiencesTitle}>
              Find your way into the province.
            </Typography>
          </div>
          <ExperienceCarousel items={experiences} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
