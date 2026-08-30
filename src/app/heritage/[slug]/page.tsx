import { notFound } from "next/navigation";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import { heritageSites } from "@/data/heritageSites";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import { HeritageGrid } from "@/components/organisms/HeritageGrid/HeritageGrid";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Button } from "@/components/atoms/Button/Button";
import styles from "./detail.module.css";
import type { Metadata } from "next";

interface Params {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return heritageSites.map((site) => ({
    slug: site.slug,
  }));
}

export function generateMetadata({ params }: Params): Metadata {
  const site = heritageSites.find((s) => s.slug === params.slug);
  if (!site) return {};

  return {
    title: `${site.name} | Pangasinan Heritage Digital Showcase`,
    description: site.shortDescription,
  };
}

export default function HeritageDetailPage({ params }: Params) {
  const site = heritageSites.find((s) => s.slug === params.slug);

  if (!site) {
    notFound();
  }

  const relatedSites = heritageSites
    .filter((s) => s.id !== site.id && (s.location === site.location || s.heritageType === site.heritageType))
    .slice(0, 3);

  return (
    <>
      <main id="main-content" className={styles.main}>
        {/* DESTINATION HERO */}
        <section className={styles.hero}>
          <div className={styles.heroVisual} data-reveal="clip">
            {site.image ? (
              <ResponsiveImage
                src={site.image}
                alt={site.imageAlt}
                className={styles.heroImage}
                priority
                sizes="100vw"
                fullBleed
              />
            ) : (
              <div className={styles.heroPlaceholder}>No verified image available</div>
            )}
          </div>
          <div className={styles.heroContent} data-reveal="fade-up" data-delay="1">
            <Typography variant="eyebrow">{site.location} / PANGASINAN</Typography>
            <Typography as="h1" variant="display" className={styles.title}>{site.name}</Typography>
            <Typography variant="body" className={styles.tags}>
              {site.heritageClass} • {site.heritageType}
            </Typography>
          </div>
        </section>

        <div className={styles.container}>
          {/* QUICK INFORMATION */}
          <aside className={styles.sidebar} data-reveal="fade-up" data-delay="2">
            <Typography as="h2" variant="eyebrow" className={styles.sidebarHeading}>Quick Information</Typography>
            <dl className={styles.infoList}>
              <div className={styles.infoItem}>
                <dt>Location</dt>
                <dd>{site.location}, Pangasinan</dd>
              </div>
              <div className={styles.infoItem}>
                <dt>Classification</dt>
                <dd>{site.heritageClass}</dd>
              </div>
              <div className={styles.infoItem}>
                <dt>Subtype</dt>
                <dd>{site.heritageType}</dd>
              </div>
              {site.coordinates && (
                <div className={styles.infoItem}>
                  <dt>Coordinates</dt>
                  <dd>{site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}</dd>
                </div>
              )}
              {site.sourceUrl && (
                <div className={styles.infoItem}>
                  <dt>Source</dt>
                  <dd><a href={site.sourceUrl} target="_blank" rel="noreferrer" className={styles.sourceLink}>AWARAN Archive</a></dd>
                </div>
              )}
            </dl>
          </aside>

          {/* OVERVIEW */}
          <div className={styles.content} data-reveal="fade-up" data-delay="3">
            <Typography as="h2" variant="heading">Overview</Typography>
            <Typography variant="body" className={styles.bodyText}>
              {site.description}
            </Typography>
            <div style={{ marginTop: '2rem' }}>
               <Button href="/heritage" variant="secondary"><Icon name="arrow-left" /> Back to Explore</Button>
            </div>
          </div>
        </div>

        {/* RELATED / NEARBY HERITAGE */}
        {relatedSites.length > 0 && (
          <section className={styles.related} data-reveal="fade-up">
            <div className={styles.relatedHeader}>
              <Typography variant="eyebrow">Continue Exploring</Typography>
              <Typography as="h2" variant="heading">More from {site.location}</Typography>
            </div>
            <HeritageGrid sites={relatedSites} />
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

