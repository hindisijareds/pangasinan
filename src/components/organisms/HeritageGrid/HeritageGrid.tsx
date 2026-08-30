"use client";

import { useMemo, useState } from "react";
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
        <SearchForm onSearch={setQuery} resultCount={filteredSites.length} value={query} />
        <CategoryFilter
          activeCategory={activeCategory}
          categories={categories}
          onSelect={setActiveCategory}
        />
      </div>

      {filteredSites.length > 0 ? (
        <div className={styles.grid} data-doc-component="heritage-grid">
          {filteredSites.map((site, index) => (
            <div data-delay={Math.min(4, index % 3)} data-reveal="fade-up" key={site.id}>
              <HeritageCard headingLevel="h2" priority={index === 0} site={site} />
            </div>
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
