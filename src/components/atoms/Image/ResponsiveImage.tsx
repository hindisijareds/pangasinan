"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";
import styles from "./ResponsiveImage.module.css";

interface ResponsiveImageProps {
  alt: string;
  className?: string;
  fullBleed?: boolean;
  imageClassName?: string;
  parallax?: number;
  priority?: boolean;
  reveal?: "clip" | "fade-up" | "line" | "scale";
  revealDelay?: number;
  sizes: string;
  src: string;
}

export function ResponsiveImage({
  alt,
  className,
  fullBleed = false,
  imageClassName,
  parallax,
  priority = false,
  reveal,
  revealDelay,
  sizes,
  src,
}: ResponsiveImageProps) {
  const image = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(priority);
  const fullSource = withBasePath(src);
  const smallSource = withBasePath(src.replace(/\.webp$/, "-640.webp"));

  useEffect(() => {
    if (image.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(" ")}
      data-delay={revealDelay}
      data-loaded={loaded}
      data-parallax={parallax}
      data-reveal={reveal}
    >
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
          onLoad={() => setLoaded(true)}
          ref={image}
          sizes={sizes}
          src={smallSource}
        />
      </picture>
    </div>
  );
}
