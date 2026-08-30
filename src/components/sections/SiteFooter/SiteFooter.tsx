import { TransitionLink } from "@/components/motion/TransitionLink/TransitionLink";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock} data-reveal="fade-up">
          <span aria-hidden="true" className={styles.mark}>P</span>
          <Typography as="h2" variant="heading">PANGASINAN</Typography>
          <Typography variant="body">
            Stories of land,<br />
            water,<br />
            faith,<br />
            history,<br />
            and people.
          </Typography>
        </div>

        <div className={styles.linkGroup} data-delay="1" data-reveal="fade-up">
          <h3>DISCOVER</h3>
          <TransitionLink href="/">Home</TransitionLink>
          <TransitionLink href="/heritage">Heritage</TransitionLink>
          <TransitionLink href="/about">About Pangasinan</TransitionLink>
        </div>

        <div className={styles.linkGroup} data-delay="2" data-reveal="fade-up">
          <h3>FEATURED</h3>
          <TransitionLink href="/heritage/hundred-island">Hundred Islands</TransitionLink>
          <TransitionLink href="/heritage/cape-bolinao-light-house">Cape Bolinao</TransitionLink>
          <TransitionLink href="/heritage/pangasinan-provincial-capitol-building">Provincial Capitol</TransitionLink>
          <TransitionLink href="/heritage/balungao-hot-spring">Balungao</TransitionLink>
        </div>

        <div className={styles.bottom} data-reveal="line">
          <p>Pangasinan Heritage Digital Showcase</p>
          <p>Academic digital heritage project.</p>
        </div>
      </div>
    </footer>
  );
}
