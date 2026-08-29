import { TransitionLink } from "@/components/motion/TransitionLink/TransitionLink";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock} data-reveal="fade-up">
          <span aria-hidden="true" className={styles.mark}>P</span>
          <Typography as="h2" variant="heading">Pangasinan</Typography>
          <Typography variant="body">
            A digital journey through a province of islands, landmarks, living faith, and coastal light.
          </Typography>
        </div>

        <div className={styles.linkGroup} data-delay="1" data-reveal="fade-up">
          <h3>Discover</h3>
          <TransitionLink href="/">Home</TransitionLink>
          <TransitionLink href="/heritage">Heritage sites</TransitionLink>
          <TransitionLink href="/design-system">Design system</TransitionLink>
        </div>

        <div className={styles.linkGroup} data-delay="2" data-reveal="fade-up">
          <h3>Featured places</h3>
          <TransitionLink href="/heritage">Hundred Islands</TransitionLink>
          <TransitionLink href="/heritage">Bolinao</TransitionLink>
          <TransitionLink href="/heritage">Manaoag</TransitionLink>
          <TransitionLink href="/heritage">Lingayen</TransitionLink>
        </div>

        <div className={styles.linkGroup} data-delay="3" data-reveal="fade-up">
          <h3>Visit thoughtfully</h3>
          <p>Confirm current access, local guidance, and visitor conditions before travel.</p>
        </div>

        <div className={styles.bottom} data-reveal="line">
          <p>Elective 4 · Special Topics in IT · University project</p>
          <p>Photography credits and licenses are listed in IMAGE-CREDITS.md.</p>
        </div>
      </div>
    </footer>
  );
}
