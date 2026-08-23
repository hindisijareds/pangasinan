import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.lead}>
          <Typography variant="eyebrow">Pangasinan Heritage Digital Showcase</Typography>
          <Typography as="h2" variant="heading">Travel with curiosity. Visit with care.</Typography>
          <Typography variant="body">
            An educational showcase of Pangasinan&apos;s landscapes and heritage places. Confirm current access, local guidance, and visitor conditions before travel.
          </Typography>
        </div>
        <div className={styles.bottom}>
          <p>Elective 4 - Special Topics in IT · University project</p>
          <p className={styles.credits}>
            Photographs from Wikimedia Commons: BiancaBrazal, Emman A. Foronda, Ralff Nestor Nacor, Kuranges, and Beltugade. Full licenses and source links are listed in IMAGE-CREDITS.md.
          </p>
        </div>
      </div>
    </footer>
  );
}
