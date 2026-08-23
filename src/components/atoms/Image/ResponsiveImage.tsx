import { withBasePath } from "@/lib/paths";
import styles from "./ResponsiveImage.module.css";

interface ResponsiveImageProps {
  alt: string;
  className?: string;
  fullBleed?: boolean;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
  src: string;
}

export function ResponsiveImage({
  alt,
  className,
  fullBleed = false,
  imageClassName,
  priority = false,
  sizes,
  src,
}: ResponsiveImageProps) {
  const fullSource = withBasePath(src);
  const smallSource = withBasePath(src.replace(/\.webp$/, "-640.webp"));

  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")}>
      <picture className={styles.picture}>
        {fullBleed && <source media="(min-width: 48rem)" srcSet={fullSource} />}
        {/* Native picture sources keep static exports responsive without an image server. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={alt}
          className={[styles.image, imageClassName].filter(Boolean).join(" ")}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          src={smallSource}
        />
      </picture>
    </div>
  );
}
