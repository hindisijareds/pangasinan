"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onClear: () => void;
  onSearch: (value: string) => void;
  resultCount: number;
  value: string;
}

export function SearchForm({ onClear, onSearch, resultCount, value }: SearchFormProps) {
  return (
    <form className={styles.form} data-doc-component="search-form" onSubmit={(event) => event.preventDefault()} role="search">
      <label className={styles.label} htmlFor="heritage-search">
        Search the collection
      </label>
      <div className={styles.field}>
        <Icon name="search" />
        <input
          aria-describedby="heritage-search-status"
          autoComplete="off"
          className={styles.input}
          id="heritage-search"
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search places, towns, or heritage types..."
          type="search"
          value={value}
        />
        {value && (
          <button aria-label="Clear search" className={styles.clear} onClick={onClear} type="button">
            <Icon name="close" />
          </button>
        )}
      </div>
      <p aria-live="polite" className={styles.hint} id="heritage-search-status">
        {resultCount} {resultCount === 1 ? "place" : "places"} found
      </p>
    </form>
  );
}
