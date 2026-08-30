"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";
import styles from "./ResponsiveImage.module.css";

interface ResponsiveImageProps {
  alt: string;
  className?: string;
  imageClassName?: string;
  parallax?: number;
  priority?: boolean;
  reveal?: "clip" | "fade-up" | "line" | "scale";
  revealDelay?: number;
  sizes: string;
  src: string;
}

const imageDimensions: Record<string, { height: number; smallWidth: number; width: number }> = {
  "/images/bolinao-lighthouse.webp": { height: 1280, smallWidth: 427, width: 854 },
  "/images/hundred-islands.webp": { height: 960, smallWidth: 640, width: 1280 },
  "/images/manaoag-church.webp": { height: 742, smallWidth: 640, width: 960 },
  "/images/patar-beach.webp": { height: 960, smallWidth: 640, width: 1280 },
  "/images/provincial-capitol.webp": { height: 852, smallWidth: 640, width: 1280 },
};

export function ResponsiveImage({
  alt,
  className,
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
  const smallSource = withBasePath(src.replace(/\.(webp|jpg|jpeg|png)$/, "-640.$1"));
  const dimensions = imageDimensions[src] ?? { height: 900, smallWidth: 640, width: 1600 };
  const srcSet = `${smallSource} ${dimensions.smallWidth}w, ${fullSource} ${dimensions.width}w`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={alt}
          className={[styles.image, imageClassName].filter(Boolean).join(" ")}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          height={dimensions.height}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          ref={image}
          sizes={sizes}
          src={fullSource}
          srcSet={srcSet}
          width={dimensions.width}
        />
      </picture>
    </div>
  );
}
