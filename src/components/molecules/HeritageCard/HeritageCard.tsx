import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import type { HeritageSite } from "@/types/heritage";
import styles from "./HeritageCard.module.css";

interface HeritageCardProps {
  compact?: boolean;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  site: HeritageSite;
}

export function HeritageCard({ compact = false, headingLevel = "h3", priority = false, site }: HeritageCardProps) {
  return (
    <article className={[styles.card, compact && styles.compact].filter(Boolean).join(" ")} tabIndex={0}>
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
        <div className={styles.meta}>
          <span>{site.location}</span>
          <span>{site.category}</span>
        </div>
        <Typography as={headingLevel} variant="title">
          {site.name}
        </Typography>
        <Typography className={styles.description} variant="small">
          {site.shortDescription}
        </Typography>
        {!compact && (
          <ul aria-label={`${site.name} highlights`} className={styles.highlights}>
            {site.highlights.map((highlight) => (
              <li className={styles.highlight} key={highlight}>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
