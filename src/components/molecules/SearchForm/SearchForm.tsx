"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSearch: (value: string) => void;
  resultCount: number;
  value: string;
}

export function SearchForm({ onSearch, resultCount, value }: SearchFormProps) {
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
          placeholder="Try Bolinao, nature, or lighthouse"
          type="search"
          value={value}
        />
      </div>
      <p aria-live="polite" className={styles.hint} id="heritage-search-status">
        {resultCount} {resultCount === 1 ? "destination" : "destinations"} shown
      </p>
    </form>
  );
}
