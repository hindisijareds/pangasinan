import styles from "./CategoryFilter.module.css";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className={styles.filterGroup} role="group" aria-label="Filter by heritage class">
      <button
        className={`${styles.filterBtn} ${activeCategory === "All" ? styles.active : ""}`}
        onClick={() => onSelect("All")}
        type="button"
        aria-pressed={activeCategory === "All"}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ""}`}
          onClick={() => onSelect(category)}
          type="button"
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

