import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
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
  return (
    <article className={[styles.card, compact && styles.compact].filter(Boolean).join(" ")} tabIndex={0}>
      <div className={styles.metaTop}>
        {index !== undefined && <span className={styles.indexNum}>{(index + 1).toString().padStart(2, '0')}</span>}
        <span className={styles.locationLabel}>{site.location}</span>
      </div>

      {site.image ? (
        <ResponsiveImage
          alt={site.imageAlt}
          className={styles.image}
          priority={priority}
          sizes={compact ? "(max-width: 767px) 84vw, 28rem" : "(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"}
          src={site.image}
        />
      ) : (
        <div
          aria-label={`${site.name} visual placeholder. A verified site photograph is pending.`}
          className={styles.placeholder}
          role="img"
        >
          <span className={styles.placeholderNote}>Verified photo pending</span>
        </div>
      )}

      <div className={styles.content}>
        <Typography as={headingLevel} variant="title">
          {site.name}
        </Typography>
        <div className={styles.metaBottom}>
          <span>{site.heritageClass}</span>
          <span>{site.heritageType}</span>
        </div>
        <Typography className={styles.description} variant="small">
          {site.shortDescription}
        </Typography>
        
        <div className={styles.actionWrap}>
          <Button href={`/heritage/${site.slug}`} variant="ghost" className={styles.exploreBtn}>
            Explore <Icon name="arrow-right" />
          </Button>
        </div>
      </div>
    </article>
  );
}
