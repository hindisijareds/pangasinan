import { notFound } from "next/navigation";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
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

  // Related sites logic: prioritize same location
  const sameLocation = heritageSites.filter((s) => s.id !== site.id && s.location === site.location);
  const sameType = heritageSites.filter((s) => s.id !== site.id && s.heritageType === site.heritageType && s.location !== site.location);
  
  const relatedSites = [...sameLocation, ...sameType].slice(0, 3);
  
  // Determine correct heading based on what was actually found
  const relatedHeading = sameLocation.length > 0 ? `More from ${site.location}` : "You may also like";

  return (
    <>
      <main id="main-content" className={styles.main}>
        {/* DESTINATION HERO */}
        {site.image ? (
          <section className={styles.heroTypeA}>
            <div className={styles.heroVisualA} data-reveal="clip">
              <ResponsiveImage
                src={site.image}
                alt={site.imageAlt || site.name}
                className={styles.heroImageA}
                priority
                sizes="100vw"
              />
              <div className={styles.heroOverlayA} />
            </div>
            <div className={styles.heroContentA} data-reveal="fade-up" data-delay="1">
              <span className={styles.eyebrowA}>{site.location} / PANGASINAN</span>
              <h1 className={styles.titleA}>{site.name}</h1>
              <span className={styles.tagsA}>
                {site.heritageClass} • {site.heritageType}
              </span>
            </div>
          </section>
        ) : (
          <section className={styles.heroTypeB} data-reveal="fade-up">
            <div className={styles.heroContentB}>
              <span className={styles.indexNumB}>0{heritageSites.findIndex(s => s.id === site.id) + 1}</span>
              <span className={styles.eyebrowB}>{site.location} / PANGASINAN</span>
              <h1 className={styles.titleB}>{site.name}</h1>
              <span className={styles.tagsB}>
                {site.heritageClass} • {site.heritageType}
              </span>
            </div>
          </section>
        )}

        <div className={styles.container}>
          {/* QUICK INFORMATION */}
          <aside className={styles.sidebar} data-reveal="fade-up" data-delay="2">
            <span className={styles.sidebarHeading}>Quick Information</span>
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
            <h2 className={styles.overviewHeading}>Overview</h2>
            <div className={styles.bodyText}>
              {site.description.split("\n").map((p, i) => (
                p.trim() ? <p key={i}>{p}</p> : null
              ))}
            </div>
            <div className={styles.backAction}>
               <Button href="/heritage" variant="secondary"><Icon name="arrow-left" /> Back to Collection</Button>
            </div>
          </div>
        </div>

        {/* RELATED / NEARBY HERITAGE */}
        {relatedSites.length > 0 && (
          <section className={styles.related} data-reveal="fade-up">
            <div className={styles.relatedHeader}>
              <span className={styles.relatedEyebrow}>Continue Exploring</span>
              <h2 className={styles.relatedHeading}>{relatedHeading}</h2>
            </div>
            <HeritageGrid sites={relatedSites} />
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

