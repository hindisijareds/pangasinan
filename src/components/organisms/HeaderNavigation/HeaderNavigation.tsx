"use client";

import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/atoms/Image/ResponsiveImage";
import { TransitionLink } from "@/components/motion/TransitionLink/TransitionLink";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem";
import styles from "./HeaderNavigation.module.css";

const items = [
  {
    href: "/",
    label: "Discover Pangasinan",
    image: "/images/hundred-islands.jpg",
    imageAlt: "Hundred Islands National Park",
  },
  {
    href: "/heritage",
    label: "Heritage collection",
    image: "/images/provincial-capitol.jpg",
    imageAlt: "Pangasinan Provincial Capitol",
  },
];

export function HeaderNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activePreview, setActivePreview] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const nextY = window.scrollY;
      setScrolled(nextY > 64);
      if (open || nextY < 90) setHidden(false);
      else if (nextY > 120 && nextY > lastY + 4) setHidden(true);
      else if (nextY < lastY - 8) setHidden(false);
      lastY = nextY;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setHidden(false);
    const focusTimer = window.setTimeout(() =>
      panel.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 180);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => document.getElementById("menu-toggle")?.focus());
        return;
      }
      if (event.key !== "Tab") return;
      const panelFocusable = panel.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const toggle = document.getElementById("menu-toggle");
      const focusable = [toggle, ...(panelFocusable ? [...panelFocusable] : [])].filter(Boolean) as HTMLElement[];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={[styles.header, isHome ? styles.homeHeader : ""].filter(Boolean).join(" ")}
      data-doc-component="header-navigation"
      data-hidden={hidden}
      data-open={open}
      data-scrolled={scrolled}
      onFocusCapture={() => setHidden(false)}
    >
      <div className={styles.bar}>
        <TransitionLink className={styles.brand} href="/">
          <span className={styles.brandText}>PANGASINAN</span>
        </TransitionLink>

        <nav className={styles.desktopNav}>
          <TransitionLink href="/" className={pathname === "/" ? styles.activeLink : ""}>Discover</TransitionLink>
          <TransitionLink href="/heritage" className={pathname === "/heritage" ? styles.activeLink : ""}>Heritage</TransitionLink>
          <TransitionLink href="/culture" className={pathname === "/culture" ? styles.activeLink : ""}>Culture</TransitionLink>
          <TransitionLink href="/about" className={pathname === "/about" ? styles.activeLink : ""}>About</TransitionLink>
        </nav>

        <div className={styles.rightActions}>
          <TransitionLink href="/heritage" className={styles.exploreLink}>
            Explore Pangasinan ↗
          </TransitionLink>
          <button
            aria-controls="site-navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className={styles.menuToggle}
            id="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span>{open ? "CLOSE" : "MENU"}</span>
          </button>
        </div>
      </div>

      <div
        aria-hidden={!open}
        aria-label="Site navigation"
        aria-modal={open || undefined}
        className={styles.mobilePanel}
        data-open={open}
        id="site-navigation"
        ref={panel}
        role="dialog"
      >
        <div className={styles.panelInner}>
          <div className={styles.panelContent}>
            <p className={styles.panelEyebrow}>Explore the province</p>
            <nav aria-label="Primary navigation" className={styles.mobileNav}>
              {items.map((item, index) => (
                <div
                  className={styles.navItem}
                  key={item.href}
                  onFocusCapture={() => setActivePreview(index)}
                  onMouseEnter={() => setActivePreview(index)}
                >
                  <NavigationItem
                    active={pathname === item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={styles.navLinkContent}
                      style={{ "--menu-delay": `${120 + index * 70}ms` } as CSSProperties}
                    >
                      <span className={styles.navNumber}>0{index + 1}</span>
                      {item.label}
                    </span>
                  </NavigationItem>
                </div>
              ))}
            </nav>
            <p className={styles.mobileNote}>
              Stories of land, coast, faith, and living culture across Pangasinan.
            </p>
          </div>

          <div aria-hidden="true" className={styles.preview}>
            {items.map((item, index) => (
              <ResponsiveImage
                alt=""
                className={[styles.previewImage, activePreview === index ? styles.previewActive : ""].filter(Boolean).join(" ")}
                key={item.image}
                sizes="38vw"
                src={item.image}
              />
            ))}
            <div className={styles.previewCaption}>
              <span>Featured view</span>
              <strong>{items[activePreview].imageAlt}</strong>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
