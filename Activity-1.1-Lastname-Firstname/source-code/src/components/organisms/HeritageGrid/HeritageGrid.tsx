"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { HeritageCard } from "@/components/molecules/HeritageCard/HeritageCard";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm";
import type { HeritageSite } from "@/types/heritage";
import styles from "./HeritageGrid.module.css";

interface HeritageGridProps {
  sites: HeritageSite[];
}

export function HeritageGrid({ sites }: HeritageGridProps) {
  const [query, setQuery] = useState("");
  const filteredSites = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return sites;

    return sites.filter((site) =>
      [
        site.name,
        site.location,
        site.province,
        site.category,
        site.shortDescription,
        ...site.highlights,
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(term),
    );
  }, [query, sites]);

  return (
    <section aria-label="Heritage destinations" className={styles.explorer}>
      <div className={styles.searchWrap}>
        <SearchForm onSearch={setQuery} resultCount={filteredSites.length} value={query} />
      </div>

      {filteredSites.length > 0 ? (
        <div className={styles.grid} data-doc-component="heritage-grid">
          {filteredSites.map((site, index) => (
            <HeritageCard headingLevel="h2" key={site.id} priority={index === 0} site={site} />
          ))}
        </div>
      ) : (
        <div className={styles.empty} role="status">
          <h2>No destinations match “{query}”</h2>
          <p>Try a place such as Bolinao, a category such as Nature, or clear the search to see the full collection.</p>
          <Button onClick={() => setQuery("")} type="button" variant="secondary">
            Clear search
          </Button>
        </div>
      )}
    </section>
  );
}
