import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { Typography } from "@/components/atoms/Typography/Typography";
import { HeritageCard } from "@/components/molecules/HeritageCard/HeritageCard";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem";
import { HeritageGrid } from "@/components/organisms/HeritageGrid/HeritageGrid";
import { heritageSites } from "@/data/heritageSites";
import styles from "./design-system.module.css";

export const metadata: Metadata = {
  title: "Atomic Design Component Preview",
  robots: { index: false, follow: false },
};

const tokens = [
  ["Paper", "var(--color-background)"],
  ["Soft Paper", "var(--color-surface)"],
  ["Sand", "var(--color-surface-secondary)"],
  ["Heritage Green", "var(--color-deep)"],
  ["Dark Green", "var(--color-deep-dark)"],
  ["Terracotta", "var(--color-accent)"],
  ["Warm Brown", "var(--color-accent-strong)"],
  ["Primary Text", "var(--color-foreground)"],
];

function Preview({ children, description, id, title }: { children: React.ReactNode; description: string; id: string; title: string }) {
  return (
    <section className={styles.preview} data-doc-component={id}>
      <div className={styles.previewHeader}>
        <Typography as="h2" variant="title">{title}</Typography>
        <Typography variant="small">{description}</Typography>
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className={styles.main} id="main-content">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <Typography variant="eyebrow">Internal production documentation</Typography>
          <Typography as="h1" variant="heading">Pangasinan design system</Typography>
          <Typography variant="body">The production tokens and Atomic Design components shared by Home, Heritage, About, and every heritage detail view.</Typography>
        </header>

        <Preview description="Primary, secondary, and icon-only actions." id="button" title="Atom · Button">
          <div className={styles.row}>
            <Button>Explore Pangasinan</Button>
            <Button variant="secondary">Learn more</Button>
            <Button aria-label="Move to next item" iconOnly variant="secondary"><Icon name="arrow-right" /></Button>
          </div>
        </Preview>

        <Preview description="Editorial display styles paired with readable interface text." id="typography" title="Atom · Typography">
          <div className={styles.typeStack}>
            <Typography variant="eyebrow">Province of Pangasinan</Typography>
            <Typography as="p" variant="heading">Stories shaped by land and sea.</Typography>
            <Typography variant="body">A clear body style supports longer descriptions across screen sizes.</Typography>
          </div>
        </Preview>

        <Preview description="Semantic variables shared by every component." id="color-tokens" title="Atom · Color Tokens">
          <div className={styles.swatches}>
            {tokens.map(([label, value]) => (
              <div className={styles.swatch} key={label}>
                <div className={styles.swatchColor} style={{ "--swatch": value } as CSSProperties} />
                <span className={styles.swatchLabel}>{label}</span>
              </div>
            ))}
          </div>
        </Preview>

        <Preview description="Inline, current-color SVG symbols with decorative semantics." id="icon" title="Atom · Icon">
          <div className={styles.row}>
            <Icon name="search" size={28} />
            <Icon name="menu" size={28} />
            <Icon name="arrow-left" size={28} />
            <Icon name="arrow-right" size={28} />
            <Icon name="arrow-up-right" size={28} />
          </div>
        </Preview>

        <Preview description="Responsive local imagery with a fixed aspect ratio and useful alternative text." id="image" title="Atom · Image">
          <ResponsiveImage alt="Romulo Island in Hundred Islands National Park" className={styles.imagePreview} sizes="(max-width: 900px) 90vw, 70rem" src="/images/hundred-islands.webp" />
        </Preview>

        <Preview description="A reusable destination summary built from image and typography atoms. Type A (Verified Image) and Type B (Text-first)." id="heritage-card" title="Molecule · Heritage Card">
          <div className={styles.cardWrap}>
            <HeritageCard site={heritageSites.find(s => s.image) || heritageSites[0]} />
            <HeritageCard site={heritageSites.find(s => !s.image) || heritageSites[1]} />
          </div>
        </Preview>

        <Preview description="Real links with current-page semantics and generous targets." id="navigation-item" title="Molecule · Navigation Item">
          <nav aria-label="Navigation item preview" className={styles.navPreview}>
            <NavigationItem active href="/design-system">Home</NavigationItem>
            <NavigationItem href="/heritage">Heritage sites</NavigationItem>
          </nav>
        </Preview>

        <Preview description="Search Form and Heritage Grid operate together as the browsing experience." id="search-grid" title="Molecule + Organism · Search Form and Heritage Grid">
          <HeritageGrid sites={heritageSites.slice(0, 3)} />
        </Preview>
      </div>
    </main>
  );
}
