import { HeritageCard } from "@/components/molecules/HeritageCard/HeritageCard";
import type { HeritageSite } from "@/types/heritage";
import styles from "./RelatedHeritage.module.css";

interface RelatedHeritageProps {
  sites: HeritageSite[];
}

export function RelatedHeritage({ sites }: RelatedHeritageProps) {
  return (
    <div className={styles.grid}>
      {sites.map((site) => (
        <HeritageCard key={site.id} site={site} />
      ))}
    </div>
  );
}
