"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { HeritageCard } from "@/components/molecules/HeritageCard/HeritageCard";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm";
import { CategoryFilter } from "@/components/molecules/CategoryFilter/CategoryFilter";
import type { HeritageSite } from "@/types/heritage";
import styles from "./HeritageGrid.module.css";

interface HeritageGridProps {
  sites: HeritageSite[];
}

export function HeritageGrid({ sites }: HeritageGridProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [query, activeCategory]);

  const categories = useMemo(() => {
    const classes = new Set(sites.map((s) => s.heritageClass));
    return Array.from(classes).sort();
  }, [sites]);

  const filteredSites = useMemo(() => {
    let filtered = sites;
    if (activeCategory !== "All") {
      filtered = filtered.filter((site) => site.heritageClass === activeCategory);
    }
    const term = query.trim().toLocaleLowerCase();
    if (!term) return filtered;

    return filtered.filter((site) =>
      [
        site.name,
        site.location,
        site.province,
        site.heritageClass,
        site.heritageType,
        site.shortDescription,
        ...site.highlights,
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(term),
    );
  }, [query, sites, activeCategory]);

  return (
    <section aria-label="Heritage destinations" className={styles.explorer}>
      <div className={styles.searchWrap} data-reveal="fade-up">
        <SearchForm
          onClear={() => setQuery("")}
          onSearch={setQuery}
          resultCount={filteredSites.length}
          value={query}
        />
        <CategoryFilter
          activeCategory={activeCategory}
          categories={categories}
          onSelect={setActiveCategory}
        />
      </div>

      {filteredSites.length > 0 ? (
        <div className={styles.resultsWrap}>
          <div className={styles.grid} data-doc-component="heritage-grid">
            {filteredSites.slice(0, visibleCount).map((site, index) => (
              <div key={site.id}>
                <HeritageCard headingLevel="h2" priority={index === 0} site={site} index={index} />
              </div>
            ))}
          </div>
          {visibleCount < filteredSites.length && (
            <div className={styles.loadMore} data-reveal="fade-up">
              <Button onClick={() => setVisibleCount(c => c + 12)} variant="secondary">
                Show more places
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.empty} role="status">
          <h2>No heritage places match your search.</h2>
          <p>Try another place, town, or heritage type, or clear the filters to see the complete archive.</p>
          <Button onClick={() => { setQuery(""); setActiveCategory("All"); }} type="button" variant="secondary">
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}
