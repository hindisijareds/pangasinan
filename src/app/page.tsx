import Link from "next/link";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import { CinematicHero } from "@/components/sections/CinematicHero/CinematicHero";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import styles from "./page.module.css";

const experiences = [
  {
    title: "Island nature",
    place: "Alaminos City",
    image: "/images/hundred-islands.webp",
    alt: "Tree-covered islands and blue water in Hundred Islands National Park",
  },
  {
    title: "Coastal days",
    place: "Patar, Bolinao",
    image: "/images/patar-beach.webp",
    alt: "The open shoreline and sea at Patar Beach",
  },
  {
    title: "Living faith",
    place: "Manaoag",
    image: "/images/manaoag-church.webp",
    alt: "The facade and bell tower of Manaoag Church",
  },
  {
    title: "Civic heritage",
    place: "Lingayen",
    image: "/images/provincial-capitol.webp",
    alt: "Pangasinan Provincial Capitol beneath a blue sky",
  },
];

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <CinematicHero />

        <section aria-labelledby="province-story" className={styles.manifesto}>
          <Typography as="h2" id="province-story" variant="heading">
            Follow the salt air, cross the island waters, and discover a province
            shaped by nature, memory, and everyday life.
          </Typography>
        </section>

        <section aria-labelledby="coast-heading" className={styles.splitStory}>
          <div className={styles.splitVisual}>
            <ResponsiveImage
              alt="Sandy shore and clear blue water at Patar Beach in Bolinao"
              className={styles.portraitImage}
              sizes="(max-width: 767px) 88vw, 43vw"
              src="/images/patar-beach.webp"
            />
            <span aria-hidden="true" className={styles.imageIndex}>01</span>
          </div>
          <div className={styles.splitCopy}>
            <Typography variant="eyebrow">The western coast</Typography>
            <Typography as="h2" id="coast-heading" variant="heading">
              Room to breathe
            </Typography>
            <Typography variant="body">
              In Bolinao, warm light meets the West Philippine Sea. Beaches,
              coves, and a historic lighthouse make the coast feel both open and
              deeply rooted in place.
            </Typography>
            <Button href="/heritage" variant="ghost">
              Explore the coast <Icon name="arrow-up-right" />
            </Button>
          </div>
        </section>

        <section aria-label="A journey across Pangasinan" className={styles.imageJourney}>
          <div className={styles.journeyIntro}>
            <Typography variant="eyebrow">A province in many frames</Typography>
            <Typography as="h2" variant="heading">
              From quiet landmarks to wide horizons.
            </Typography>
          </div>
          <ResponsiveImage
            alt="Cape Bolinao Lighthouse framed by trees"
            className={`${styles.journeyImage} ${styles.journeyImageTall}`}
            sizes="(max-width: 767px) 72vw, 31vw"
            src="/images/bolinao-lighthouse.webp"
          />
          <ResponsiveImage
            alt="Pangasinan Provincial Capitol in Lingayen"
            className={`${styles.journeyImage} ${styles.journeyImageSmall}`}
            sizes="(max-width: 767px) 56vw, 21vw"
            src="/images/provincial-capitol.webp"
          />
          <ResponsiveImage
            alt="Facade of Manaoag Church"
            className={`${styles.journeyImage} ${styles.journeyImageWide}`}
            sizes="(max-width: 767px) 72vw, 32vw"
            src="/images/manaoag-church.webp"
          />
        </section>

        <section aria-labelledby="seasons-heading" className={styles.seasons}>
          <div className={styles.seasonsInner}>
            <ResponsiveImage
              alt="Boats and islands at Hundred Islands National Park"
              className={styles.seasonsImage}
              sizes="(max-width: 767px) 100vw, 43vw"
              src="/images/hundred-islands.webp"
            />
            <div className={styles.seasonsCopy}>
              <Typography variant="eyebrow">Made for unhurried days</Typography>
              <Typography as="h2" id="seasons-heading" variant="heading">
                A different journey every season
              </Typography>
              <Typography variant="body">
                Set out by boat, walk beneath old trees, share food in a town
                plaza, or watch the last light settle over the coast. Pangasinan
                rewards travelers who take their time.
              </Typography>
              <Button href="/heritage" variant="ghost">
                Begin your journey <Icon name="arrow-right" />
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="heritage-heading" className={styles.heritageFeature}>
          <div className={styles.heritageCopy}>
            <Typography variant="eyebrow">Heritage collection</Typography>
            <Typography as="h2" id="heritage-heading" variant="heading">
              Stories held by place
            </Typography>
            <Typography variant="body">
              Explore landscapes and landmarks that reveal the many sides of the province.
            </Typography>
            <nav aria-label="Featured heritage categories" className={styles.placeLinks}>
              <Link href="/heritage">Island landscapes <Icon name="arrow-right" /></Link>
              <Link href="/heritage">Coastal landmarks <Icon name="arrow-right" /></Link>
              <Link href="/heritage">Faith &amp; tradition <Icon name="arrow-right" /></Link>
              <Link href="/heritage">Civic heritage <Icon name="arrow-right" /></Link>
              <Link href="/heritage">Outdoor escapes <Icon name="arrow-right" /></Link>
            </nav>
            <Button href="/heritage" variant="ghost">View all places</Button>
          </div>
          <ResponsiveImage
            alt="The Pangasinan Provincial Capitol, a civic landmark in Lingayen"
            className={styles.heritageImage}
            sizes="(max-width: 767px) 100vw, 48vw"
            src="/images/provincial-capitol.webp"
          />
        </section>

        <section aria-labelledby="experiences-heading" className={styles.experiences}>
          <div className={styles.experiencesHeading}>
            <Typography variant="eyebrow">Ways to experience Pangasinan</Typography>
            <Typography as="h2" id="experiences-heading" variant="heading">
              Find your way into the province
            </Typography>
          </div>
          <div className={styles.experienceTrack}>
            {experiences.map((experience, index) => (
              <Link className={styles.experienceCard} href="/heritage" key={experience.title}>
                <ResponsiveImage
                  alt={experience.alt}
                  className={styles.experienceImage}
                  sizes="(max-width: 767px) 82vw, 36vw"
                  src={experience.image}
                />
                <span className={styles.experienceNumber}>0{index + 1}</span>
                <div className={styles.experienceMeta}>
                  <Typography as="h3" variant="title">{experience.title}</Typography>
                  <span>{experience.place}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
