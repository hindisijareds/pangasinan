import Link from "next/link";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <span aria-hidden="true" className={styles.mark}>P</span>
          <Typography as="h2" variant="heading">Pangasinan</Typography>
          <Typography variant="body">
            A digital journey through a province of islands, landmarks, living faith, and coastal light.
          </Typography>
        </div>

        <div className={styles.linkGroup}>
          <h3>Discover</h3>
          <Link href="/">Home</Link>
          <Link href="/heritage">Heritage sites</Link>
          <Link href="/design-system">Design system</Link>
        </div>

        <div className={styles.linkGroup}>
          <h3>Featured places</h3>
          <Link href="/heritage">Hundred Islands</Link>
          <Link href="/heritage">Bolinao</Link>
          <Link href="/heritage">Manaoag</Link>
          <Link href="/heritage">Lingayen</Link>
        </div>

        <div className={styles.linkGroup}>
          <h3>Visit thoughtfully</h3>
          <p>Confirm current access, local guidance, and visitor conditions before travel.</p>
        </div>

        <div className={styles.bottom}>
          <p>Elective 4 · Special Topics in IT · University project</p>
          <p>Photography credits and licenses are listed in IMAGE-CREDITS.md.</p>
        </div>
      </div>
    </footer>
  );
}
