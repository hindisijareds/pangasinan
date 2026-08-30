import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { HeritageSite } from "@/types/heritage";
import styles from "./HeritageCard.module.css";

interface HeritageCardProps {
  compact?: boolean;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  site: HeritageSite;
  index?: number;
}

export function HeritageCard({ compact = false, headingLevel = "h3", priority = false, site, index }: HeritageCardProps) {
  const HeadingTag = headingLevel;

  // TYPE A: Verified Image Card
  if (site.image) {
    return (
      <article className={[styles.card, styles.typeA, compact && styles.compact].filter(Boolean).join(" ")}>
        <div className={styles.imageWrap}>
          <ResponsiveImage
            alt={site.imageAlt || site.name}
            className={styles.image}
            priority={priority}
            sizes={compact ? "(max-width: 767px) 84vw, 28rem" : "(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"}
            src={site.image}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.metaTop}>
            {index !== undefined && <span className={styles.indexNum}>{(index + 1).toString().padStart(2, '0')}</span>}
            <span className={styles.locationLabel}>{site.location}</span>
          </div>
          <HeadingTag className={styles.title}>{site.name}</HeadingTag>
          <div className={styles.metaBottom}>
            <span className={styles.classLabel}>{site.heritageClass}</span>
          </div>
          <p className={styles.description}>{site.shortDescription}</p>
          <div className={styles.actionWrap}>
            <Button href={`/heritage/${site.slug}`} variant="ghost" className={styles.exploreBtn}>
              View Heritage <Icon name="arrow-right" />
            </Button>
          </div>
        </div>
      </article>
    );
  }

  // TYPE B: No Verified Image (Text-first, shorter)
  return (
    <article className={[styles.card, styles.typeB, compact && styles.compact].filter(Boolean).join(" ")}>
      <div className={styles.contentB}>
        <div className={styles.metaTopB}>
          {index !== undefined && <span className={styles.indexNum}>{(index + 1).toString().padStart(2, '0')}</span>}
          <div className={styles.labelsB}>
            <span className={styles.locationLabel}>{site.location}</span>
            <span className={styles.classLabel}>{site.heritageClass}</span>
          </div>
        </div>
        <HeadingTag className={styles.title}>{site.name}</HeadingTag>
        <p className={styles.description}>{site.shortDescription}</p>
        <div className={styles.metaBottom}>
          <span className={styles.typeLabel}>{site.heritageType}</span>
        </div>
        <div className={styles.actionWrap}>
          <Button href={`/heritage/${site.slug}`} variant="ghost" className={styles.exploreBtn}>
            View Heritage <Icon name="arrow-right" />
          </Button>
        </div>
      </div>
    </article>
  );
}
