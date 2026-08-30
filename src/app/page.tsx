import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import { CinematicHero } from "@/components/sections/CinematicHero/CinematicHero";
import { ExperienceCarousel, type ExperienceCarouselItem } from "@/components/sections/ExperienceCarousel/ExperienceCarousel";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import { TransitionLink } from "@/components/motion/TransitionLink/TransitionLink";
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

        <section aria-labelledby="province-story" className={styles.manifesto}>
          <Typography as="h2" data-reveal="fade-up" id="province-story" variant="heading">
            More than a destination.
          </Typography>
          <Typography data-reveal="fade-up" data-delay="1" variant="body" style={{ marginTop: '1rem', maxWidth: '60ch', marginInline: 'auto' }}>
            Pangasinan is home to natural heritage, historical landmarks, coastal destinations, and important civic and religious sites that tell the story of a province rich in both nature and culture.
          </Typography>
        </section>

        <section aria-labelledby="lighthouse-heading" className={styles.splitStory}>
          <div className={styles.splitVisual} data-reveal="clip">
            <ResponsiveImage
              alt="Cape Bolinao Lighthouse framed by trees"
              className={styles.portraitImage}
              parallax={28}
              sizes="(max-width: 767px) 88vw, 43vw"
              src="/images/bolinao-lighthouse.webp"
            />
            <span aria-hidden="true" className={styles.imageIndex}>01</span>
          </div>
          <div className={styles.splitCopy} data-delay="1" data-reveal="fade-up">
            <Typography variant="eyebrow">Immovable Heritage • Bolinao</Typography>
            <Typography as="h2" id="lighthouse-heading" variant="heading">
              Cape Bolinao Lighthouse
            </Typography>
            <Typography variant="body">
              Cape Bolinao Lighthouse is one of the oldest operational lighthouses in the Philippines. Constructed during the Spanish colonial period in 1903, it stands on Punta Piedra Point overlooking the West Philippine Sea, guiding ships safely along the northwestern coast for more than a century.
            </Typography>
            <Button href="/heritage/cape-bolinao-light-house" variant="ghost">
              View Heritage <Icon name="arrow-up-right" />
            </Button>
          </div>
        </section>

        <section aria-label="A journey across Pangasinan" className={styles.imageJourney}>
          <div className={styles.journeyIntro} data-reveal="fade-up">
            <Typography variant="eyebrow">A province in many frames</Typography>
            <Typography as="h2" variant="heading">
              From quiet landmarks to wide horizons.
            </Typography>
          </div>
          <ResponsiveImage
            alt="Cape Bolinao Lighthouse framed by trees"
            className={`${styles.journeyImage} ${styles.journeyImageTall}`}
            parallax={42}
            reveal="clip"
            sizes="(max-width: 767px) 72vw, 31vw"
            src="/images/bolinao-lighthouse.webp"
          />
          <ResponsiveImage
            alt="Pangasinan Provincial Capitol in Lingayen"
            className={`${styles.journeyImage} ${styles.journeyImageSmall}`}
            parallax={26}
            reveal="clip"
            revealDelay={1}
            sizes="(max-width: 767px) 56vw, 21vw"
            src="/images/provincial-capitol.webp"
          />
          <ResponsiveImage
            alt="Facade of Manaoag Church"
            className={`${styles.journeyImage} ${styles.journeyImageWide}`}
            parallax={36}
            reveal="clip"
            revealDelay={2}
            sizes="(max-width: 767px) 72vw, 32vw"
            src="/images/manaoag-church.webp"
          />
        </section>

        <section aria-labelledby="seasons-heading" className={styles.seasons}>
          <div className={styles.seasonsInner}>
            <ResponsiveImage
              alt="Boats and islands at Hundred Islands National Park"
              className={styles.seasonsImage}
              parallax={28}
              reveal="clip"
              sizes="(max-width: 767px) 100vw, 43vw"
              src="/images/hundred-islands.webp"
            />
            <div className={styles.seasonsCopy} data-delay="1" data-reveal="fade-up">
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
          <div className={styles.heritageCopy} data-reveal="fade-up">
            <Typography variant="eyebrow">Heritage collection</Typography>
            <Typography as="h2" id="heritage-heading" variant="heading">
              Stories held by place
            </Typography>
            <Typography variant="body">
              Explore landscapes and landmarks that reveal the many sides of the province.
            </Typography>
            <nav aria-label="Featured heritage categories" className={styles.placeLinks}>
              <TransitionLink href="/heritage">Natural Heritage <Icon name="arrow-right" /></TransitionLink>
              <TransitionLink href="/heritage">Immovable Heritage <Icon name="arrow-right" /></TransitionLink>
              <TransitionLink href="/heritage">Body of Water <Icon name="arrow-right" /></TransitionLink>
              <TransitionLink href="/heritage">Church <Icon name="arrow-right" /></TransitionLink>
              <TransitionLink href="/heritage">Monument <Icon name="arrow-right" /></TransitionLink>
            </nav>
            <Button href="/heritage" variant="ghost">View all places</Button>
          </div>
          <ResponsiveImage
            alt="The Pangasinan Provincial Capitol, a civic landmark in Lingayen"
            className={styles.heritageImage}
            parallax={24}
            reveal="clip"
            revealDelay={1}
            sizes="(max-width: 767px) 100vw, 48vw"
            src="/images/provincial-capitol.webp"
          />
        </section>

        <section aria-labelledby="experiences-heading" className={styles.experiences}>
          <div className={styles.experiencesHeading} data-reveal="fade-up">
            <Typography variant="eyebrow">Ways to experience Pangasinan</Typography>
            <Typography as="h2" id="experiences-heading" variant="heading">
              Find your way into the province
            </Typography>
          </div>
          <ExperienceCarousel items={experiences} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
